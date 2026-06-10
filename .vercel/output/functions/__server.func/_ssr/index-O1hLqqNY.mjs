import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as gsapWithCSS, a as ScrollTrigger, S as ScrollToPlugin } from "../_libs/gsap.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function Reveal({
  children,
  delay = 0,
  className = "",
  threshold = 0.12
}) {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className,
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.85s ease-out ${delay}ms, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform"
      },
      children
    }
  );
}
const SNIPPETS = {
  mern: {
    file: "~/mern/freelance-dashboard/server.js",
    code: `// MERN  client project management API
import express from "express";
import mongoose from "mongoose";
import Project from "./models/Project.js";

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.post("/api/projects", async (req, res) => {
  const { title, client, budget, deadline, status } = req.body;

  const project = await Project.create({
    title,
    client,
    budget,
    deadline,
    status: status || "active",
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    project,
  });
});

app.get("/api/projects", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

app.listen(5000, () => {
  console.log("MERN backend running on port 5000");
});`
  },
  cpp: {
    file: "~/cpp/problem-solving/order_summary.cpp",
    code: `// C++  freelance order cost calculator
#include <iostream>
#include <vector>
using namespace std;

struct Service {
  string name;
  double price;
};

double calculateTotal(vector<Service> services) {
  double total = 0;

  for (Service service : services) {
    total += service.price;
  }

  return total;
}

int main() {
  vector<Service> services = {
    {"Portfolio Website", 25000},
    {"Admin Dashboard", 40000},
    {"Backend API", 30000}
  };

  double total = calculateTotal(services);

  cout << "Freelance Project Summary" << endl;
  cout << "Total Services: " << services.size() << endl;
  cout << "Total Cost: PKR " << total << endl;

  return 0;
}`
  },
  python: {
    file: "~/python/automation/client_report.py",
    code: `# Python  automated client project report
from datetime import datetime

projects = [
    {"name": "Portfolio Website", "status": "Completed", "progress": 100},
    {"name": "E-Commerce Dashboard", "status": "In Progress", "progress": 75},
    {"name": "Business Landing Page", "status": "Completed", "progress": 100},
]

def generate_report(projects):
    completed = [p for p in projects if p["status"] == "Completed"]

    print("Client Project Report")
    print("Generated:", datetime.now().strftime("%d %b %Y"))
    print("Total Projects:", len(projects))
    print("Completed Projects:", len(completed))
    print()

    for project in projects:
        print(f'{project["name"]} - {project["progress"]}% - {project["status"]}')

generate_report(projects)`
  }
};
const TABS = [
  { id: "mern", label: "MERN" },
  { id: "cpp", label: "C++" },
  { id: "python", label: "Python" }
];
function highlightLine(line, lang) {
  const commentStart = lang === "python" ? line.indexOf("#") : line.indexOf("//");
  let codePart = line;
  let commentPart = "";
  if (commentStart !== -1) {
    codePart = line.slice(0, commentStart);
    commentPart = line.slice(commentStart);
  }
  const keywordRegex = lang === "cpp" ? /\b(include|using|namespace|struct|string|double|int|return|for|if|else|vector|cout|endl|main)\b/g : lang === "python" ? /\b(from|import|def|return|for|in|if|else|print)\b/g : /\b(import|from|const|let|async|await|return|new|if|else|for)\b/g;
  const functionRegex = /\b(express|json|connect|post|get|create|status|find|sort|listen|size|calculateTotal|generate_report|strftime|now|append)\b/g;
  const stringRegex = /(".*?"|'.*?'|`.*?`)/g;
  const numberRegex = /\b(\d+)\b/g;
  const parts = codePart.split(
    /(".*?"|'.*?'|`.*?`|\b\d+\b|\b[A-Za-z_][A-Za-z0-9_]*\b)/g
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    parts.map((part, index) => {
      if (!part) return null;
      if (stringRegex.test(part)) {
        stringRegex.lastIndex = 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-300", children: part }, index);
      }
      if (numberRegex.test(part)) {
        numberRegex.lastIndex = 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-300", children: part }, index);
      }
      if (keywordRegex.test(part)) {
        keywordRegex.lastIndex = 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-pink-400", children: part }, index);
      }
      if (functionRegex.test(part)) {
        functionRegex.lastIndex = 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-300", children: part }, index);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, index);
    }),
    commentPart && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 italic", children: commentPart })
  ] });
}
function LiveCode() {
  const [lang, setLang] = reactExports.useState("mern");
  const [text, setText] = reactExports.useState("");
  const reduceRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);
  reactExports.useEffect(() => {
    const target = SNIPPETS[lang].code;
    if (reduceRef.current) {
      setText(target);
      return;
    }
    setText("");
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setText(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, 14);
    return () => clearInterval(id);
  }, [lang]);
  const lines = text.split("\n");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl overflow-hidden border border-white/10 bg-[#0b1020]/95 shadow-2xl shadow-cyan-500/10 w-full max-w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 bg-[#0f172a]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-400 shadow-lg shadow-red-400/40 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/40 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-400 shadow-lg shadow-green-400/40 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 sm:ml-3 font-mono text-[10px] sm:text-xs text-slate-400 truncate min-w-0", children: SNIPPETS[lang].file }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-[10px] sm:text-xs text-cyan-300 animate-pulse shrink-0", children: "● live" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 sm:gap-1 px-2 sm:px-3 pt-2 sm:pt-3 border-b border-white/10 bg-[#0b1020]", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setLang(t.id),
        className: `font-mono text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-t-lg transition-all ${lang === t.id ? "bg-cyan-400/10 text-cyan-300 border-b-2 border-cyan-300" : "text-slate-500 hover:text-slate-200"}`,
        children: t.label
      },
      t.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "pre",
      {
        className: "font-mono leading-relaxed text-slate-200",
        style: {
          fontSize: "clamp(10px, 2.5vw, 12.5px)",
          padding: "clamp(10px, 3vw, 20px)",
          minHeight: "18rem",
          maxHeight: "26rem",
          overflowX: "auto",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch"
        },
        children: [
          lines.map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600 w-5 sm:w-8 shrink-0 select-none text-right pr-2 sm:pr-3 text-[9px] sm:text-[11px]", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 min-w-0 whitespace-pre", children: line ? highlightLine(line, lang) : " " })
          ] }, i)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2 h-4 bg-cyan-300 align-middle animate-pulse" })
        ]
      }
    )
  ] });
}
function createSupabaseClient() {
  const SUPABASE_URL = "https://rdvlxcqymhhxpxzwyyvr.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_NTzhD-8-Ulhfozv_jGdiVA_aRW7atQ1";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
const schema = objectType({
  name: stringType().trim().min(1, "Name is required").max(100),
  email: stringType().trim().email("Invalid email address").max(255),
  message: stringType().trim().min(5, "Message must be at least 5 characters").max(2e3)
});
function ContactForm() {
  const [form, setForm] = reactExports.useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: void 0 }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0];
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
        message: parsed.data.message
      });
      if (error) {
        console.error("Supabase insert error:", error);
        toast.error("Could not send message. Please try again or email directly.", {
          description: error.message,
          duration: 6e3
        });
        return;
      }
      toast.success("Message sent successfully!", {
        description: "I'll get back to you within 24 hours.",
        duration: 5e3
      });
      setForm({ name: "", email: "", message: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4e3);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };
  const inputClass = "w-full bg-secondary/40 border border-border/60 rounded-xl px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors text-foreground placeholder:text-muted-foreground/50 text-sm";
  const errorClass = "font-mono text-xs mt-1.5 flex items-center gap-1";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit,
      className: "glass rounded-3xl p-5 sm:p-6 md:p-8 text-left space-y-5",
      noValidate: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Your name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: form.name,
                onChange: (e) => updateField("name", e.target.value),
                maxLength: 100,
                placeholder: "e.g. Ahmed Khan",
                className: `${inputClass} ${errors.name ? "border-destructive/70" : ""}`,
                autoComplete: "name"
              }
            ),
            errors.name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `${errorClass} text-destructive/80`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
              " ",
              errors.name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Email address *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                value: form.email,
                onChange: (e) => updateField("email", e.target.value),
                maxLength: 255,
                placeholder: "you@example.com",
                className: `${inputClass} ${errors.email ? "border-destructive/70" : ""}`,
                autoComplete: "email"
              }
            ),
            errors.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `${errorClass} text-destructive/80`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
              " ",
              errors.email
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-xs uppercase tracking-wider text-muted-foreground", children: "Message *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground/50", children: [
              form.message.length,
              "/2000"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: form.message,
              onChange: (e) => updateField("message", e.target.value),
              rows: 5,
              maxLength: 2e3,
              placeholder: "Tell me about your project, idea, or just say hello…",
              className: `${inputClass} resize-none ${errors.message ? "border-destructive/70" : ""}`
            }
          ),
          errors.message && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `${errorClass} text-destructive/80`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
            " ",
            errors.message
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: loading || submitted,
              className: "w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-primary transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
                "Sending…"
              ] }) : submitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "✓ Sent!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Send message →" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground/50", children: "* Required fields" })
        ] })
      ]
    }
  );
}
if (typeof window !== "undefined") {
  gsapWithCSS.registerPlugin(ScrollTrigger, ScrollToPlugin);
  ScrollTrigger.config({ ignoreMobileResize: true });
}
let audioCtx = null;
let gainNode = null;
let oscillator = null;
function getAudioCtx() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.connect(audioCtx.destination);
  }
  return audioCtx;
}
function playAmbient(on) {
  try {
    const ctx = getAudioCtx();
    if (on) {
      if (!oscillator) {
        oscillator = ctx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(55, ctx.currentTime);
        oscillator.connect(gainNode);
        oscillator.start();
      }
      gainNode.gain.cancelScheduledValues(ctx.currentTime);
      gainNode.gain.setTargetAtTime(0.04, ctx.currentTime, 0.5);
    } else {
      if (gainNode) {
        gainNode.gain.cancelScheduledValues(ctx.currentTime);
        gainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
      }
    }
  } catch (_) {
  }
}
function useSoundToggle() {
  const [on, setOn] = reactExports.useState(false);
  const toggle = reactExports.useCallback(() => {
    const next = !on;
    setOn(next);
    playAmbient(next);
  }, [on]);
  return { on, toggle };
}
function CinematicHero() {
  const root = reactExports.useRef(null);
  const { on: soundOn, toggle: toggleSound } = useSoundToggle();
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    const ctx = gsapWithCSS.context(() => {
      const tl = gsapWithCSS.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: isMobile ? "+=40%" : "+=100%",
          pin: true,
          pinSpacing: true,
          scrub: isMobile ? 0.4 : 1,
          invalidateOnRefresh: true,
          refreshPriority: 1
        }
      });
      tl.to(
        el.querySelector(".hero-center"),
        {
          scale: isMobile ? 2.6 : 6,
          opacity: 0,
          ease: "power2.in"
        },
        0
      ).to(el.querySelectorAll(".hero-corner"), { opacity: 0, y: -16, ease: "power1.in" }, 0).to(el.querySelector(".hero-sub"), { opacity: 0, y: -40, ease: "power1.in" }, 0).to(el.querySelectorAll(".hero-hint"), { opacity: 0, ease: "power1.in" }, 0);
    }, el);
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref: root,
      className: "relative w-full",
      style: {
        height: "100svh",
        // svh accounts for iOS dynamic toolbar
        overflowX: "clip",
        // clip NOT hidden — avoids rogue scroll container
        overflowY: "visible"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-corner absolute top-24 left-4 sm:left-6 md:left-10 font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/70 leading-relaxed z-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base sm:text-2xl tracking-tighter text-foreground/90 whitespace-nowrap", children: "WALEED//" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 opacity-70 whitespace-nowrap", children: "// Copyright © 2026" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 opacity-60 whitespace-nowrap", children: "M. Waleed Khattak, Inc." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-60 whitespace-nowrap", children: "All Rights Reserved." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-corner absolute top-24 right-4 sm:right-6 md:right-10 text-right font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/60 max-w-27.5 sm:max-w-40 md:max-w-52 leading-relaxed z-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground/80", children: "///// Engineer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 opacity-70 normal-case text-[8px] sm:text-[9px] md:text-[10px] leading-snug", children: "For clients of all sizes, building immersive web platforms with care, taste and grit." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-center absolute inset-0 flex flex-col items-center justify-center z-10 will-change-transform gap-3 sm:gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 rounded-full blur-2xl opacity-50 scale-110",
                style: { background: "var(--gradient-hero)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/profile-1.png",
                alt: "Waleed Khattak",
                className: "relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full object-cover border-2 border-primary/40 shadow-2xl"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute -inset-1 rounded-full opacity-35 pointer-events-none",
                style: {
                  background: "conic-gradient(from 0deg, transparent 0%, var(--primary) 40%, var(--accent-magenta) 60%, transparent 100%)",
                  animation: "spin 8s linear infinite"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "font-display font-bold leading-none tracking-tighter text-center px-3",
              style: { fontSize: "clamp(3.4rem, 16vw, 8rem)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gradient", children: [
                "WALEED",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "KHATTAK"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-sub absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 text-center px-4 z-10 w-full pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/70", children: "Full Stack Engineer · MERN · AI · WebGL" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-hint absolute bottom-5 sm:bottom-6 left-4 sm:left-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-foreground/60 z-20 pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "↓ Scroll" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: "to discover." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: toggleSound,
            className: "hero-hint absolute bottom-5 sm:bottom-6 right-4 sm:right-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] z-20 flex items-center gap-1.5 cursor-pointer transition-colors",
            "aria-label": soundOn ? "Turn sound off" : "Turn sound on",
            style: { color: soundOn ? "var(--primary)" : "oklch(0.65 0.04 250)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "inline-block w-1.5 h-1.5 rounded-full transition-all duration-300",
                  style: {
                    background: soundOn ? "var(--primary)" : "oklch(0.45 0.04 250)",
                    boxShadow: soundOn ? "0 0 8px var(--primary)" : "none"
                  }
                }
              ),
              soundOn ? "◉ sound: on" : "◎ sound: off"
            ]
          }
        )
      ]
    }
  );
}
function GiantTextReveal({
  lines,
  highlightIndex = 1
}) {
  const root = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;
    const ctx = gsapWithCSS.context(() => {
      const words = el.querySelectorAll(".gt-line");
      gsapWithCSS.set(words, { y: 80, opacity: 0 });
      gsapWithCSS.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "+=220",
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      }).to(words, { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out" });
    }, el);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref: root,
      className: "relative py-16 md:py-28 lg:py-40 px-4",
      style: { overflowX: "clip" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto text-center font-display font-bold uppercase leading-[0.9] tracking-tighter", children: lines.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "gt-line block will-change-transform",
          style: { fontSize: "clamp(2.2rem, 8vw, 7rem)", overflow: "clip" },
          children: i === highlightIndex ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-linear-to-r from-primary to-accent-magenta text-background px-4 sm:px-6 py-1 sm:py-2 rounded-md rotate-[-1.5deg]", children: l }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: i === 0 ? "text-foreground" : "text-foreground/30", children: l })
        },
        i
      )) })
    }
  );
}
function Marquee({ text, speed = 30 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "relative border-y border-border/40 bg-background/40 backdrop-blur-sm py-4 sm:py-5",
      style: { overflowX: "clip" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex whitespace-nowrap gap-8 sm:gap-12 font-display font-bold uppercase tracking-tighter",
          style: {
            animation: `marquee ${speed}s linear infinite`,
            fontSize: "clamp(1.8rem, 5vw, 4rem)"
          },
          children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: i % 2 ? "text-gradient" : "text-foreground/20", children: text }, i))
        }
      )
    }
  );
}
const Scene3D = reactExports.lazy(() => import("./Scene3D-D2s6gdMc.mjs"));
const SKILLS = [{
  group: "Frontend",
  items: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js", "GLSL"]
}, {
  group: "Backend",
  items: ["Node.js", "Express", "PHP", "REST APIs", "Auth/JWT", "Socket.io"]
}, {
  group: "Data",
  items: ["MongoDB", "MySQL", "Prisma", "Mongoose", "Chart.js"]
}, {
  group: "Languages",
  items: ["JavaScript", "Python", "C++", "PHP", "SQL"]
}, {
  group: "AI & Tools",
  items: ["APIs Integrations", "AI Automation", "Git", "GitHub", "Vercel"]
}, {
  group: "Soft Skills",
  items: ["Digital Marketing", "Content Creation", "Teamwork", "Communication", "Problem Solving"]
}];
const PROJECTS = [{
  name: "Nexora Track",
  tag: "AI Recruitment",
  desc: "Rule-based automated interview & recruitment platform with scoring, dashboards and analytics.",
  stack: ["PHP", "MySQL", "Chart.js"],
  year: "2025–26",
  demo: "#",
  code: "https://github.com/waleed-khattak",
  codePreview: `<?php
// NexoraTrack - Candidate scoring engine
class ScoringEngine {
  private array $weights = [
    'technical' => 0.4,
    'communication' => 0.3,
    'cultural_fit' => 0.3,
  ];

  public function score(array $responses): float {
    $total = 0.0;
    foreach ($this->weights as $key => $w) {
      $total += ($responses[$key] ?? 0) * $w;
    }
    return round($total, 2);
  }
}

$engine = new ScoringEngine();
echo $engine->score([
  'technical'      => 88,
  'communication'  => 75,
  'cultural_fit'   => 90,
]); // → 84.5`
}, {
  name: "GURU Homes",
  tag: "Construction SaaS",
  desc: "Construction platform with AI cost estimation and digital signing contracts.",
  stack: ["PHP", "MySQL", "JS"],
  year: "2026",
  demo: "#",
  code: "https://github.com/waleed-khattak",
  codePreview: `// GURU Homes - AI Cost Estimator
async function estimateCost(project) {
  const { area, type, quality } = project;
  
  const baseRates = {
    residential: 4500,  // PKR per sq ft
    commercial:  6200,
    industrial:  5100,
  };

  const qualityMultiplier = {
    standard: 1.0,
    premium:  1.35,
    luxury:   1.85,
  };

  const base = area * baseRates[type];
  const cost = base * qualityMultiplier[quality];
  
  return {
    estimated: cost,
    formatted: \`PKR \${cost.toLocaleString()}\`,
    range: [cost * 0.9, cost * 1.15],
  };
}`
}, {
  name: "FitGenie",
  tag: "Fitness Web App",
  desc: "MERN fitness platform with personalized dashboards and authenticated experiences.",
  stack: ["MongoDB", "Express", "React", "Node"],
  year: "2025–26",
  demo: "#",
  code: "https://github.com/waleed-khattak",
  codePreview: `// FitGenie - Workout Plan Generator
const generatePlan = async (req, res) => {
  const { userId, goal, level } = req.body;
  
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const plan = {
    goal,
    level,
    weeks: 8,
    sessions: buildSessions(goal, level),
    nutrition: calcMacros(user.weight, user.height, goal),
    createdAt: new Date(),
  };

  await WorkoutPlan.create({ userId, ...plan });
  
  res.status(201).json({
    success: true,
    message: 'Personalized plan created!',
    plan,
  });
};`
}, {
  name: "Transport Tracker",
  tag: "Live Tracking",
  desc: "Real-time vehicle tracking, route management and trip dashboards.",
  stack: ["MERN", "Sockets", "Maps"],
  year: "2026",
  demo: "#",
  code: "https://github.com/waleed-khattak",
  codePreview: `// TransportTracker - Real-time location emit
io.on('connection', (socket) => {
  console.log(\`Driver connected: \${socket.id}\`);

  socket.on('location:update', async (data) => {
    const { vehicleId, lat, lng, speed } = data;

    await Vehicle.findByIdAndUpdate(vehicleId, {
      location: { lat, lng },
      speed,
      lastSeen: new Date(),
    });

    // Broadcast to all subscribers
    io.to(\`trip:\${vehicleId}\`).emit('vehicle:moved', {
      vehicleId, lat, lng, speed,
      timestamp: Date.now(),
    });
  });

  socket.on('disconnect', () => {
    console.log(\`Driver disconnected: \${socket.id}\`);
  });
});`
}, {
  name: "RayhanX.ai",
  tag: "AI Automation",
  desc: "AI business automation platform - chatbots, workflows, analytics dashboards.",
  stack: ["React", "Node", "AI APIs"],
  year: "2025",
  demo: "https://rayhanx.ai",
  code: "https://github.com/waleed-khattak",
  codePreview: `// RayhanX - AI Workflow Orchestrator
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function runWorkflow(trigger, context) {
  const steps = await WorkflowStep.find({ triggerId: trigger.id })
                                  .sort('order');

  let accumulated = context;

  for (const step of steps) {
    if (step.type === 'ai_generate') {
      const res = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: step.systemPrompt },
          { role: 'user',   content: JSON.stringify(accumulated) },
        ],
      });
      accumulated.output = res.choices[0].message.content;
    }
    await logStep(step.id, accumulated);
  }
  return accumulated;
}`
}, {
  name: "Qadri Real Estate",
  tag: "Property Platform",
  desc: "Property listings, inquiries and admin dashboard - live at qadrirealestate.com.",
  stack: ["PHP", "MySQL", "JS"],
  year: "2025–26",
  demo: "https://qadrirealestate.com",
  code: "https://github.com/waleed-khattak",
  codePreview: `<?php
// QadriRealEstate - Property search with filters
class PropertyRepository {
  public function search(array $filters): array {
    $sql = "SELECT * FROM properties WHERE status = 'active'";
    $params = [];

    if (!empty($filters['city'])) {
      $sql .= " AND city = ?";
      $params[] = $filters['city'];
    }
    if (!empty($filters['type'])) {
      $sql .= " AND type = ?";
      $params[] = $filters['type'];
    }
    if (!empty($filters['min_price'])) {
      $sql .= " AND price >= ?";
      $params[] = $filters['min_price'];
    }
    if (!empty($filters['max_price'])) {
      $sql .= " AND price <= ?";
      $params[] = $filters['max_price'];
    }

    $sql .= " ORDER BY created_at DESC LIMIT 20";
    return $this->db->query($sql, $params)->fetchAll();
  }
}`
}];
const EXPERIENCE = [{
  date: "Mar 2026 - Present",
  role: "Full Stack Instructor",
  org: "University of Gujrat / eRozgaar",
  desc: "Visiting faculty teaching FullStack Web Development - HTML/CSS/JS, PHP, MySQL."
}, {
  date: "Nov 2023 - Present",
  role: "Freelance Software Engineer",
  org: "Remote",
  desc: "Shipping responsive web apps, admin dashboards and database systems with MERN, PHP, Python."
}, {
  date: "Aug 2023 - Mar 2026",
  role: "Web Developer",
  org: "Qadri Real Estate",
  desc: "Built and maintained the real estate platform, SEO and digital marketing operations."
}, {
  date: "Aug 2025 - Oct 2025",
  role: "Frontend Developer Intern",
  org: "Internship Pakistan",
  desc: "React.js components, performance and UI optimization on production projects."
}, {
  date: "May 2024 - Jul 2024",
  role: "Web Developer",
  org: "UOG Business Incubation Center",
  desc: "Frontend/backend work on startup incubation web platforms."
}];
function Nav() {
  const links = [{
    href: "#about",
    label: "About"
  }, {
    href: "#skills",
    label: "Skills"
  }, {
    href: "#projects",
    label: "Work"
  }, {
    href: "#experience",
    label: "Journey"
  }, {
    href: "#contact",
    label: "Contact"
  }];
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: `fixed top-0 inset-x-0 z-50 px-3 sm:px-6 py-3 sm:py-4 transition-all duration-300 ${scrolled ? "bg-background/30 backdrop-blur-xl" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex items-center justify-between glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#top", className: "font-display font-bold text-base sm:text-lg tracking-tight shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "WK" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono text-xs ml-1.5 sm:ml-2", children: "/ portfolio" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "hidden md:flex gap-6 lg:gap-8 text-sm font-medium", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, className: "text-muted-foreground hover:text-primary transition-colors", children: l.label }) }, l.href)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/Muhammad-Waleed-Resume.pdf", download: true, className: "hidden sm:inline-flex text-xs font-mono px-3 sm:px-4 py-2 rounded-full bg-primary text-primary-foreground hover:glow-primary transition-shadow whitespace-nowrap", children: "download_cv()" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full glass border border-primary/20 cursor-pointer gap-1.5 shrink-0", onClick: () => setMenuOpen(true), "aria-label": "Open navigation menu", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-px bg-foreground transition-all duration-300 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-px bg-primary transition-all duration-300 rounded-full" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mobile-nav-overlay ${menuOpen ? "open" : "closed"}`, "aria-hidden": !menuOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: closeMenu, className: "absolute top-5 right-5 w-11 h-11 rounded-full glass border border-primary/30 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/60 transition-colors cursor-pointer", "aria-label": "Close navigation menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M1 1L15 15M15 1L1 15", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -left-40 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl", style: {
        background: "var(--gradient-hero)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-40 -right-40 w-80 h-80 rounded-full pointer-events-none opacity-15 blur-3xl", style: {
        background: "var(--accent-magenta)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 font-display text-2xl font-bold tracking-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "WK" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono text-xs ml-2", children: "/ portfolio" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col items-center gap-2 w-full px-8", children: links.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "w-full max-w-xs animate-slide-in-left", style: {
        animationDelay: menuOpen ? `${i * 60}ms` : "0ms"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: l.href, onClick: closeMenu, className: "group flex items-center justify-between w-full px-6 py-4 rounded-2xl glass border border-border/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-[0.3em] text-primary opacity-60", children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-foreground group-hover:text-gradient transition-all", children: l.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground group-hover:text-primary transition-colors", children: "→" })
      ] }) }, l.href)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/Muhammad-Waleed-Resume.pdf", download: true, onClick: closeMenu, className: "mt-8 px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-primary transition-shadow text-sm animate-fade-in", style: {
        animationDelay: menuOpen ? "350ms" : "0ms"
      }, children: "↓ Download CV" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-4 font-mono text-xs text-muted-foreground animate-fade-in", style: {
        animationDelay: "400ms"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:khattak4422004@gmail.com", className: "hover:text-primary transition-colors", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.linkedin.com/in/waleed-khattak", target: "_blank", rel: "noreferrer", className: "hover:text-primary transition-colors", children: "LinkedIn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com/waleed-khattak", target: "_blank", rel: "noreferrer", className: "hover:text-primary transition-colors", children: "GitHub" })
      ] })
    ] })
  ] });
}
function ScrollProgress() {
  const [p, setP] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(pct);
    };
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-0 left-0 right-0 h-0.5 z-60 bg-transparent pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full transition-none", style: {
    width: `${p * 100}%`,
    background: "var(--gradient-hero)",
    boxShadow: "var(--shadow-glow)"
  } }) });
}
function CodePreviewModal({
  project,
  onClose
}) {
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  reactExports.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "project-modal-overlay animate-fade-in", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-modal-in w-full max-w-2xl max-h-[85vh] flex flex-col glass rounded-3xl overflow-hidden border border-primary/30", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border/40 bg-secondary/30 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-red-400/80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-yellow-400/80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-green-400/80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground ml-2 truncate", children: [
          "~/",
          project.name.toLowerCase().replace(/\s/g, "-"),
          "/index.js"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary/60", "aria-label": "Close", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M1 1L11 11M11 1L1 11", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-border/40 bg-secondary/20 flex items-center gap-3 shrink-0 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground", children: project.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs px-2 py-0.5 rounded-full border border-primary/30 text-primary", children: project.tag }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 ml-auto flex-wrap", children: project.stack.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] px-2 py-0.5 rounded bg-secondary/60 text-foreground/70", children: s }, s)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto flex-1 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "font-mono text-[12px] sm:text-[13px] leading-relaxed text-slate-200 whitespace-pre-wrap wrap-break-word", children: project.codePreview.split("\n").map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600 select-none w-6 text-right shrink-0", children: i + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: line || " " })
    ] }, i)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-t border-border/40 flex items-center gap-3 shrink-0 flex-wrap", children: [
      project.demo !== "#" && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: project.demo, target: "_blank", rel: "noreferrer", className: "font-mono text-xs px-4 py-2 rounded-full bg-primary/15 text-primary hover:bg-primary/25 transition-colors", children: "↗ Live Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: project.code, target: "_blank", rel: "noreferrer", className: "font-mono text-xs px-4 py-2 rounded-full border border-border/60 text-foreground/80 hover:border-primary/60 hover:text-primary transition-colors", children: [
        "</>",
        " View on GitHub"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "ml-auto font-mono text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer", children: "Close" })
    ] })
  ] }) });
}
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "relative py-24 sm:py-32 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 sm:gap-12 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4", children: "// about" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6", children: [
          "I build things that ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "feel alive" }),
          " on the web."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Based in Gujranwala, Pakistan - finishing a 16-year Bachelors at the University of Gujrat while shipping real-world products for clients and startups." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "I care about the boring parts: clean architecture, predictable APIs, accessible UIs - and the magical parts: shaders, micro-interactions and interfaces that respond to you." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveCode, {}) }) })
  ] }) });
}
function Skills() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "skills", className: "relative py-24 sm:py-32 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4", children: "// stack" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16", children: [
        "Tools of the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "trade" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6", children: SKILLS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 sm:p-6 h-full hover:border-primary/50 transition-colors group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs uppercase tracking-wider text-primary mb-4", children: s.group }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: s.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-foreground/90 group-hover:translate-x-1 transition-transform text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-accent-magenta shrink-0" }),
        it
      ] }, it)) })
    ] }) }, s.group)) })
  ] }) });
}
function Projects() {
  const [previewProject, setPreviewProject] = reactExports.useState(null);
  const openPreview = reactExports.useCallback((project) => setPreviewProject(project), []);
  const closePreview = reactExports.useCallback(() => setPreviewProject(null), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "projects", className: "relative py-24 sm:py-32 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4", children: "// selected work" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16", children: [
          "Shipped & ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "in orbit" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-5 sm:gap-6", children: PROJECTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative glass rounded-3xl p-6 sm:p-8 h-full overflow-hidden hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none", style: {
          background: i % 2 ? "var(--accent-magenta)" : "var(--primary)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-5 sm:mb-6 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs px-3 py-1 rounded-full border border-primary/30 text-primary whitespace-nowrap", children: p.tag }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground whitespace-nowrap", children: p.year })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl sm:text-2xl md:text-3xl font-bold mb-3 group-hover:text-gradient transition-all", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-sm flex-1", children: p.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6", children: p.stack.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs px-2 py-1 rounded bg-secondary/60 text-foreground/80", children: s }, s)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 pt-4 border-t border-border/40", children: [
            p.demo !== "#" ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: p.demo, target: "_blank", rel: "noreferrer", className: "font-mono text-xs px-3 py-1.5 rounded-full bg-primary/15 text-primary hover:bg-primary/25 transition-colors flex items-center gap-1", children: "↗ Live Preview" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: true, className: "font-mono text-xs px-3 py-1.5 rounded-full bg-secondary/40 text-muted-foreground cursor-not-allowed opacity-50", children: "↗ Coming Soon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => openPreview(p), className: "font-mono text-xs px-3 py-1.5 rounded-full border border-border/60 text-foreground/80 hover:border-primary/60 hover:text-primary transition-colors cursor-pointer", children: [
              "</>",
              " Code Preview"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: p.code, target: "_blank", rel: "noreferrer", className: "font-mono text-xs px-3 py-1.5 rounded-full border border-border/40 text-muted-foreground hover:border-primary/40 hover:text-foreground/80 transition-colors", children: "GitHub →" })
          ] })
        ] })
      ] }) }, p.name)) })
    ] }) }),
    previewProject && /* @__PURE__ */ jsxRuntimeExports.jsx(CodePreviewModal, { project: previewProject, onClose: closePreview })
  ] });
}
function Experience() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "experience", className: "relative py-24 sm:py-32 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4", children: "// timeline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16", children: [
        "The ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "journey" }),
        " so far."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative space-y-6 sm:space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-linear-to-b before:from-primary before:via-accent-magenta before:to-transparent", children: EXPERIENCE.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-10 sm:pl-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-2 h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-primary animate-glow-pulse" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-primary mb-2", children: e.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg sm:text-xl font-semibold", children: e.role }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3", children: e.org }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 leading-relaxed text-sm", children: e.desc })
      ] })
    ] }) }, e.role + e.date)) })
  ] }) });
}
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contact", className: "relative py-24 sm:py-32 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4", children: "// the next thing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.95] mb-8", children: [
        "Have an idea?",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Let's build it." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed text-sm sm:text-base", children: "Drop me a message - replies usually land in your inbox within a day." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContactForm, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 font-mono text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:khattak4422004@gmail.com", className: "hover:text-primary transition-colors", children: "khattak4422004@gmail.com" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+923299557156", className: "hover:text-primary transition-colors", children: "+92 329 9557156" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 400, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 sm:mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-muted-foreground font-mono", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "© 2026 Muhammad Waleed" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "crafted with three.js, glsl & ☕" })
    ] }) })
  ] }) });
}
function Index() {
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scene3D, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CinematicHero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GiantTextReveal, { lines: ["I CRAFT", "IMMERSIVE", "DIGITAL WORLDS"], highlightIndex: 1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Marquee, { text: "MERN · Frontend · Backend · PHP · Python · WEBGL · GLSL · AI · REAL-TIME · ★", speed: 35 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skills, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GiantTextReveal, { lines: ["SHIPPED CODE,", "REAL PRODUCTS,", "REAL USERS."], highlightIndex: 1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Projects, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Experience, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Marquee, { text: "LET'S BUILD SOMETHING WILD ✦ AVAILABLE FOR WORK ✦", speed: 30 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {})
  ] });
}
export {
  Index as component
};
