/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/* ─── Sound Toggle ──────────────────────────────────────────────── */
let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let oscillator: OscillatorNode | null = null;

function getAudioCtx(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext;
    audioCtx = new AudioContextClass();
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.connect(audioCtx.destination);
  }
  return audioCtx;
}

function playAmbient(on: boolean) {
  try {
    const ctx = getAudioCtx();
    if (on) {
      if (!oscillator) {
        oscillator = ctx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(55, ctx.currentTime);
        oscillator.connect(gainNode!);
        oscillator.start();
      }
      gainNode!.gain.cancelScheduledValues(ctx.currentTime);
      gainNode!.gain.setTargetAtTime(0.04, ctx.currentTime, 0.5);
    } else {
      if (gainNode) {
        gainNode.gain.cancelScheduledValues(ctx.currentTime);
        gainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
      }
    }
  } catch (_) {
    // AudioContext blocked by browser policy — silently ignore
  }
}

export function useSoundToggle() {
  const [on, setOn] = useState(false);
  const toggle = useCallback(() => {
    const next = !on;
    setOn(next);
    playAmbient(next);
  }, [on]);
  return { on, toggle };
}

export function CinematicHero() {
  const root = useRef<HTMLDivElement>(null);
  const { on: soundOn, toggle: toggleSound } = useSoundToggle();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: isMobile ? "+=40%" : "+=100%",
          pin: true,
          pinSpacing: true,
          scrub: isMobile ? 0.4 : 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      tl.to(
        el.querySelector(".hero-center"),
        {
          scale: isMobile ? 2.6 : 6,
          opacity: 0,
          ease: "power2.in",
        },
        0,
      )
        .to(el.querySelectorAll(".hero-corner"), { opacity: 0, y: -16, ease: "power1.in" }, 0)
        .to(el.querySelector(".hero-sub"), { opacity: 0, y: -40, ease: "power1.in" }, 0)
        .to(el.querySelectorAll(".hero-hint"), { opacity: 0, ease: "power1.in" }, 0);
    }, el);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative w-full"
      style={{
        height: "100svh", // svh accounts for iOS dynamic toolbar
        overflowX: "clip", // clip NOT hidden — avoids rogue scroll container
        overflowY: "visible",
      }}
    >
      {/* corner — left */}
      <div className="hero-corner absolute top-24 left-4 sm:left-6 md:left-10 font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/70 leading-relaxed z-20">
        <div className="font-display text-base sm:text-2xl tracking-tighter text-foreground/90 whitespace-nowrap">
          WALEED//
        </div>
        <div className="mt-1 opacity-70 whitespace-nowrap">// Copyright © 2026</div>
        <div className="mt-2 opacity-60 whitespace-nowrap">M. Waleed Khattak, Inc.</div>
        <div className="opacity-60 whitespace-nowrap">All Rights Reserved.</div>
      </div>

      {/* corner — right */}
      <div className="hero-corner absolute top-24 right-4 sm:right-6 md:right-10 text-right font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/60 max-w-27.5 sm:max-w-40 md:max-w-52 leading-relaxed z-20">
        <div className="text-foreground/80">///// Engineer</div>
        <div className="mt-1 opacity-70 normal-case text-[8px] sm:text-[9px] md:text-[10px] leading-snug">
          For clients of all sizes, building immersive web platforms with care, taste and grit.
        </div>
      </div>

      {/* center group — photo + name animate together */}
      <div className="hero-center absolute inset-0 flex flex-col items-center justify-center z-10 will-change-transform gap-3 sm:gap-5">
        <div className="relative shrink-0">
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-50 scale-110"
            style={{ background: "var(--gradient-hero)" }}
          />
          <img
            src="/profile-1.png"
            alt="Waleed Khattak"
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full object-cover border-2 border-primary/40 shadow-2xl"
          />

          <div
            className="absolute -inset-1 rounded-full opacity-35 pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, var(--primary) 40%, var(--accent-magenta) 60%, transparent 100%)",
              animation: "spin 8s linear infinite",
            }}
          />
        </div>

        <h1
          className="font-display font-bold leading-none tracking-tighter text-center px-3"
          style={{ fontSize: "clamp(3.4rem, 16vw, 8rem)" }}
        >
          <span className="text-gradient">
            WALEED
            <br />
            KHATTAK
          </span>
        </h1>
      </div>

      {/* tagline */}
      <div className="hero-sub absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 text-center px-4 z-10 w-full pointer-events-none">
        <p className="font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/70">
          Full Stack Engineer · MERN · AI · WebGL
        </p>
      </div>

      {/* scroll hint */}
      <div className="hero-hint absolute bottom-5 sm:bottom-6 left-4 sm:left-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-foreground/60 z-20 pointer-events-none">
        <div>↓ Scroll</div>
        <div className="mt-0.5">to discover.</div>
      </div>

      {/* sound toggle */}
      <button
        onClick={toggleSound}
        className="hero-hint absolute bottom-5 sm:bottom-6 right-4 sm:right-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] z-20 flex items-center gap-1.5 cursor-pointer transition-colors"
        aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
        style={{ color: soundOn ? "var(--primary)" : "oklch(0.65 0.04 250)" }}
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            background: soundOn ? "var(--primary)" : "oklch(0.45 0.04 250)",
            boxShadow: soundOn ? "0 0 8px var(--primary)" : "none",
          }}
        />
        {soundOn ? "◉ sound: on" : "◎ sound: off"}
      </button>
    </section>
  );
}

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
      gsap.set(words, { y: 80, opacity: 0 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "+=220",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        .to(words, { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out" });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative py-16 md:py-28 lg:py-40 px-4"
      style={{ overflowX: "clip" }}
    >
      <div className="max-w-7xl mx-auto text-center font-display font-bold uppercase leading-[0.9] tracking-tighter">
        {lines.map((l, i) => (
          <div
            key={i}
            className="gt-line block will-change-transform"
            style={{ fontSize: "clamp(2.2rem, 8vw, 7rem)", overflow: "clip" }}
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
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            invalidateOnRefresh: true,
          },
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

export function Marquee({ text, speed = 30 }: { text: string; speed?: number }) {
  return (
    <div
      className="relative border-y border-border/40 bg-background/40 backdrop-blur-sm py-4 sm:py-5"
      style={{ overflowX: "clip" }}
    >
      <div
        className="flex whitespace-nowrap gap-8 sm:gap-12 font-display font-bold uppercase tracking-tighter"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          fontSize: "clamp(1.8rem, 5vw, 4rem)",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className={i % 2 ? "text-gradient" : "text-foreground/20"}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
