import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(5, "Message must be at least 5 characters").max(2000),
});

type FieldName = "name" | "email" | "message";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (name: FieldName, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear error for that field on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<FieldName, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as FieldName;
        errs[key] = issue.message;
      });
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const { error } = await supabase.from("contacts").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        toast.error("Could not send message. Please try again or email directly.", {
          description: error.message,
          duration: 6000,
        });
        return;
      }

      toast.success("Message sent successfully!", {
        description: "I'll get back to you within 24 hours.",
        duration: 5000,
      });
      setForm({ name: "", email: "", message: "" });
      setSubmitted(true);
      // allow re-submit after 4s
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-secondary/40 border border-border/60 rounded-xl px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors text-foreground placeholder:text-muted-foreground/50 text-sm";

  const errorClass = "font-mono text-xs mt-1.5 flex items-center gap-1";

  return (
    <form
      onSubmit={onSubmit}
      className="glass rounded-3xl p-5 sm:p-6 md:p-8 text-left space-y-5"
      noValidate
    >
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Your name *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            maxLength={100}
            placeholder="e.g. Ahmed Khan"
            className={`${inputClass} ${errors.name ? "border-destructive/70" : ""}`}
            autoComplete="name"
          />
          {errors.name && (
            <p className={`${errorClass} text-destructive/80`}>
              <span>⚠</span> {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Email address *
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            maxLength={255}
            placeholder="you@example.com"
            className={`${inputClass} ${errors.email ? "border-destructive/70" : ""}`}
            autoComplete="email"
          />
          {errors.email && (
            <p className={`${errorClass} text-destructive/80`}>
              <span>⚠</span> {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Message *
          </label>
          <span className="font-mono text-xs text-muted-foreground/50">
            {form.message.length}/2000
          </span>
        </div>
        <textarea
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          rows={5}
          maxLength={2000}
          placeholder="Tell me about your project, idea, or just say hello…"
          className={`${inputClass} resize-none ${errors.message ? "border-destructive/70" : ""}`}
        />
        {errors.message && (
          <p className={`${errorClass} text-destructive/80`}>
            <span>⚠</span> {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          type="submit"
          disabled={loading || submitted}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-primary transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Sending…
            </>
          ) : submitted ? (
            <>✓ Sent!</>
          ) : (
            <>Send message →</>
          )}
        </button>
        <p className="font-mono text-xs text-muted-foreground/50">* Required fields</p>
      </div>
    </form>
  );
}
