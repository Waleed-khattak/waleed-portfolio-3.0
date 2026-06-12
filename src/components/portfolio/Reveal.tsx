import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
  threshold = 0.12,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      setDone(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
          // Clear will-change after animation finishes so the browser
          // stops keeping this element on its own compositor layer.
          // Leaving will-change permanently causes mobile to re-composite
          // on every scroll, making content inside jump or shift.
          const t = setTimeout(() => setDone(true), delay + 900);
          return () => clearTimeout(t);
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: done
          ? "none"
          : `opacity 0.85s ease-out ${delay}ms, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: done ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
