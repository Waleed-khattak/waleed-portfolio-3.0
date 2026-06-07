import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSoundToggle } from "@/hooks/useSoundToggle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Cinematic Hero ─────────────────────────────────────────────── */
export function CinematicHero() {
  const root = useRef<HTMLDivElement>(null);
  const { on: soundOn, toggle: toggleSound } = useSoundToggle();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
        },
      });
      tl.to(".hero-title", { scale: 6, opacity: 0, ease: "power2.in" }, 0)
        .to(".hero-photo", { y: -160, opacity: 0, scale: 1.15, ease: "power2.in" }, 0)
        .to(".hero-sub", { y: -80, opacity: 0 }, 0)
        .to(".hero-corner", { opacity: 0, y: -20 }, 0)
        .to(".hero-scroll-hint", { opacity: 0 }, 0);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-screen w-full overflow-hidden">
      {/* corner copy - left */}
      <div className="hero-corner absolute top-24 left-4 sm:left-6 md:left-10 font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-foreground/70 leading-relaxed z-20 max-w-35 sm:max-w-none">
        <div className="font-display text-lg sm:text-2xl tracking-tighter text-foreground/90 whitespace-nowrap">
          WALEED//
        </div>
        <div className="mt-1 opacity-70 whitespace-nowrap">// Copyright © 2026</div>
        <div className="mt-2 sm:mt-3 opacity-60 whitespace-nowrap">M. Waleed Khattak, Inc.</div>
        <div className="opacity-60 whitespace-nowrap">All Rights Reserved.</div>
      </div>

      {/* corner copy - right */}
      <div className="hero-corner absolute top-24 right-4 sm:right-6 md:right-10 text-right font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-foreground/60 max-w-30 sm:max-w-40 md:max-w-52 leading-relaxed z-20">
        <div className="text-foreground/80">///// Engineer</div>
        <div className="mt-1 sm:mt-2 opacity-70 normal-case text-[8px] sm:text-[9px] md:text-[10px] leading-snug">
          For clients of all sizes, building immersive web platforms with care, taste and grit.
        </div>
      </div>

      {/* center: photo + name stacked - scroll together */}
      <div className="hero-title absolute inset-0 flex flex-col items-center justify-center z-10 will-change-transform gap-4 sm:gap-6">
        {/* profile photo */}
        <div className="hero-photo shrink-0">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-60 scale-110"
              style={{ background: "var(--gradient-hero)" }}
            />
            <img
              src="/profile-1.png"
              alt="Waleed Khattak"
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full object-cover border-2 border-primary/40 shadow-2xl"
              style={{
                boxShadow:
                  "0 0 60px oklch(0.78 0.18 195 / 0.5), 0 0 120px oklch(0.7 0.28 330 / 0.25)",
              }}
            />
            {/* glow ring */}
            <div
              className="absolute -inset-1 rounded-full opacity-40 animate-spin-slow"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, var(--primary) 40%, var(--accent-magenta) 60%, transparent 100%)",
                borderRadius: "50%",
                animation: "spin 8s linear infinite",
              }}
            />
          </div>
        </div>

        {/* name */}
        <h1 className="font-display text-[12vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] font-bold leading-none tracking-tighter text-center px-2">
          <span className="text-gradient">
            WALEED <br /> KHATTAK
          </span>
        </h1>
      </div>

      {/* tagline */}
      <div className="hero-sub absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 text-center px-4 z-10 w-full">
        <p className="font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-foreground/70">
          Full Stack Engineer · MERN · AI · WebGL
        </p>
      </div>

      {/* scroll hint - bottom left */}
      <div className="hero-scroll-hint absolute bottom-5 sm:bottom-6 left-4 sm:left-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-foreground/60 z-20">
        <div>↓ Scroll down</div>
        <div className="mt-1">to discover.</div>
      </div>

      {/* sound toggle - bottom right */}
      <button
        onClick={toggleSound}
        className="hero-scroll-hint absolute bottom-5 sm:bottom-6 right-4 sm:right-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] z-20 flex items-center gap-1.5 cursor-pointer transition-colors group"
        aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
        style={{ color: soundOn ? "var(--primary)" : "oklch(0.7 0.04 250)" }}
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            background: soundOn ? "var(--primary)" : "oklch(0.5 0.04 250)",
            boxShadow: soundOn ? "0 0 8px var(--primary)" : "none",
          }}
        />
        {soundOn ? "◉ sound: on" : "◎ sound: off"}
      </button>
    </section>
  );
}

/* ─── Giant Text Reveal ──────────────────────────────────────────── */
export function GiantTextReveal({
  lines,
  highlightIndex = 1,
}: {
  lines: string[];
  highlightIndex?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLElement>(".gt-line");
      gsap.set(words, { y: 140, opacity: 0, rotate: 4 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 30%",
            scrub: 1.2,
          },
        })
        .to(words, { y: 0, opacity: 1, rotate: 0, stagger: 0.18, ease: "power3.out" });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-20 md:py-32 lg:py-44 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center font-display font-bold uppercase leading-[0.9] tracking-tighter">
        {lines.map((l, i) => (
          <div
            key={i}
            className="gt-line block will-change-transform overflow-hidden"
            style={{ fontSize: "clamp(2rem, 8vw, 7rem)" }}
          >
            {i === highlightIndex ? (
              <span className="inline-block bg-linear-to-r from-primary to-accent-magenta text-background px-4 sm:px-6 py-1 sm:py-2 rounded-md rotate-[-1.5deg]">
                {l}
              </span>
            ) : (
              <span className={i === 0 ? "text-foreground" : "text-foreground/30"}>{l}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Section fade-up wrapper ────────────────────────────────────── */
export function FadeUp({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Marquee strip ──────────────────────────────────────────────── */
export function Marquee({ text, speed = 30 }: { text: string; speed?: number }) {
  return (
    <div className="relative overflow-hidden border-y border-border/40 bg-background/40 backdrop-blur-sm py-4 sm:py-6">
      <div
        className="flex whitespace-nowrap gap-8 sm:gap-12 font-display font-bold uppercase tracking-tighter"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          fontSize: "clamp(2rem, 6vw, 4.5rem)",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={i % 2 ? "text-gradient" : "text-foreground/20"}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
