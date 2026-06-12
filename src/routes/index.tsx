/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import Reveal from "@/components/portfolio/Reveal";
import LiveCode from "@/components/portfolio/LiveCode";
import ContactForm from "@/components/portfolio/ContactForm";
import { lazy, Suspense, useEffect, useState, useCallback } from "react";
import { CinematicHero, GiantTextReveal, Marquee } from "@/components/portfolio/ScrollFX";

const Scene3D = lazy(() => import("@/components/portfolio/Scene3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Waleed - Full Stack Engineer & MERN Developer" },
      {
        name: "description",
        content:
          "Portfolio of Muhammad Waleed, full stack engineer crafting MERN, PHP and AI-powered web platforms from Pakistan.",
      },
      { property: "og:title", content: "Muhammad Waleed - Full Stack Engineer" },
      {
        property: "og:description",
        content: "Immersive 3D portfolio: MERN, PHP, AI automation, real-time apps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
  }),
  component: Index,
});

/* ─── Data ─────────────────────────────────────────────────────────── */
const SKILLS = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js", "GLSL"] },
  { group: "Backend", items: ["Node.js", "Express", "PHP", "REST APIs", "Auth/JWT", "Socket.io"] },
  { group: "Data", items: ["MongoDB", "MySQL", "Prisma", "Mongoose", "Chart.js"] },
  { group: "Languages", items: ["JavaScript", "Python", "C++", "PHP", "SQL"] },
  { group: "AI & Tools", items: ["APIs Integrations", "AI Automation", "Git", "GitHub", "Vercel"] },
  {
    group: "Soft Skills",
    items: ["Digital Marketing", "Content Creation", "Teamwork", "Communication", "Problem Solving"],
  },
];

const PROJECTS = [
  {
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
]); // → 84.5`,
  },
  {
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
}`,
  },
  {
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
};`,
  },
  {
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
});`,
  },
  {
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
}`,
  },
  {
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
}`,
  },
];

const EXPERIENCE = [
  {
    date: "Mar 2026 - Present",
    role: "Full Stack Instructor",
    org: "University of Gujrat / eRozgaar",
    desc: "Visiting faculty teaching FullStack Web Development - HTML/CSS/JS, PHP, MySQL.",
  },
  {
    date: "Nov 2023 - Present",
    role: "Freelance Software Engineer",
    org: "Remote",
    desc: "Shipping responsive web apps, admin dashboards and database systems with MERN, PHP, Python.",
  },
  {
    date: "Aug 2023 - Mar 2026",
    role: "Web Developer",
    org: "Qadri Real Estate",
    desc: "Built and maintained the real estate platform, SEO and digital marketing operations.",
  },
  {
    date: "Aug 2025 - Oct 2025",
    role: "Frontend Developer Intern",
    org: "Internship Pakistan",
    desc: "React.js components, performance and UI optimization on production projects.",
  },
  {
    date: "May 2024 - Jul 2024",
    role: "Web Developer",
    org: "UOG Business Incubation Center",
    desc: "Frontend/backend work on startup incubation web platforms.",
  },
];

/* ─── Nav with hamburger ────────────────────────────────────────── */
function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Work" },
    { href: "#experience", label: "Journey" },
    { href: "#contact", label: "Contact" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 px-3 sm:px-6 py-3 sm:py-4 transition-all duration-300 ${scrolled ? "bg-background/30 backdrop-blur-xl" : ""}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3">
          <a href="#top" className="font-display font-bold text-base sm:text-lg tracking-tight shrink-0">
            <span className="text-gradient">WK</span>
            <span className="text-muted-foreground font-mono text-xs ml-1.5 sm:ml-2">/ portfolio</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/Muhammad-Waleed-Resume.pdf"
              download
              className="hidden sm:inline-flex text-xs font-mono px-3 sm:px-4 py-2 rounded-full bg-primary text-primary-foreground hover:glow-primary transition-shadow whitespace-nowrap"
            >
              download_cv()
            </a>

            {/* Hamburger button - mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full glass border border-primary/20 cursor-pointer gap-1.5 shrink-0"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <span
                className="w-4 h-px bg-foreground transition-all duration-300 rounded-full"
              />
              <span
                className="w-3 h-px bg-primary transition-all duration-300 rounded-full"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`mobile-nav-overlay ${menuOpen ? "open" : "closed"}`}
        aria-hidden={!menuOpen}
      >
        {/* Close button */}
        <button
          onClick={closeMenu}
          className="absolute top-5 right-5 w-11 h-11 rounded-full glass border border-primary/30 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/60 transition-colors cursor-pointer"
          aria-label="Close navigation menu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* Decorative gradient blob */}
        <div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full pointer-events-none opacity-15 blur-3xl"
          style={{ background: "var(--accent-magenta)" }}
        />

        {/* Logo */}
        <div className="mb-10 font-display text-2xl font-bold tracking-tight">
          <span className="text-gradient">WK</span>
          <span className="text-muted-foreground font-mono text-xs ml-2">/ portfolio</span>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col items-center gap-2 w-full px-8">
          {links.map((l, i) => (
            <li
              key={l.href}
              className="w-full max-w-xs animate-slide-in-left"
              style={{ animationDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              <a
                href={l.href}
                onClick={closeMenu}
                className="group flex items-center justify-between w-full px-6 py-4 rounded-2xl glass border border-border/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
              >
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl font-bold text-foreground group-hover:text-gradient transition-all">
                  {l.label}
                </span>
                <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
              </a>
            </li>
          ))}
        </ul>

        {/* CV download button */}
        <a
          href="/Muhammad-Waleed-Resume.pdf"
          download
          onClick={closeMenu}
          className="mt-8 px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-primary transition-shadow text-sm animate-fade-in"
          style={{ animationDelay: menuOpen ? "350ms" : "0ms" }}
        >
          ↓ Download CV
        </a>

        {/* Social */}
        <div className="mt-6 flex gap-4 font-mono text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: "400ms" }}>
          <a href="mailto:khattak4422004@gmail.com" className="hover:text-primary transition-colors">Email</a>
          <span>·</span>
          <a href="https://www.linkedin.com/in/waleed-khattak" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
          <span>·</span>
          <a href="https://github.com/waleed-khattak" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
        </div>
      </div>
    </>
  );
}

/* ─── Scroll progress bar ─────────────────────────────────────────── */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-60 bg-transparent pointer-events-none">
      <div
        className="h-full transition-none"
        style={{
          width: `${p * 100}%`,
          background: "var(--gradient-hero)",
          boxShadow: "var(--shadow-glow)",
        }}
      />
    </div>
  );
}

/* ─── Project Preview Modal ───────────────────────────────────────── */
interface Project {
  name: string;
  tag: string;
  desc: string;
  stack: string[];
  year: string;
  demo: string;
  code: string;
  codePreview: string;
}

function CodePreviewModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="project-modal-overlay animate-fade-in" onClick={onClose}>
      <div
        className="animate-modal-in w-full max-w-2xl max-h-[85vh] flex flex-col glass rounded-3xl overflow-hidden border border-primary/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 bg-secondary/30 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-400/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-400/80" />
            <span className="font-mono text-xs text-muted-foreground ml-2 truncate">
              ~/{project.name.toLowerCase().replace(/\s/g, "-")}/index.js
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary/60"
            aria-label="Close"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Project info strip */}
        <div className="px-5 py-3 border-b border-border/40 bg-secondary/20 flex items-center gap-3 shrink-0 flex-wrap">
          <span className="font-display font-bold text-sm text-foreground">{project.name}</span>
          <span className="font-mono text-xs px-2 py-0.5 rounded-full border border-primary/30 text-primary">
            {project.tag}
          </span>
          <div className="flex gap-1.5 ml-auto flex-wrap">
            {project.stack.map((s) => (
              <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary/60 text-foreground/70">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Code */}
        <div className="overflow-auto flex-1 p-5">
          <pre className="font-mono text-[12px] sm:text-[13px] leading-relaxed text-slate-200 whitespace-pre-wrap wrap-break-word">
            {project.codePreview.split("\n").map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-slate-600 select-none w-6 text-right shrink-0">{i + 1}</span>
                <span className="flex-1">{line || " "}</span>
              </div>
            ))}
          </pre>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-4 border-t border-border/40 flex items-center gap-3 shrink-0 flex-wrap">
          {project.demo !== "#" && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs px-4 py-2 rounded-full bg-primary/15 text-primary hover:bg-primary/25 transition-colors"
            >
              ↗ Live Preview
            </a>
          )}
          <a
            href={project.code}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs px-4 py-2 rounded-full border border-border/60 text-foreground/80 hover:border-primary/60 hover:text-primary transition-colors"
          >
            {"</>"} View on GitHub
          </a>
          <button
            onClick={onClose}
            className="ml-auto font-mono text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Section ────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center px-4 sm:px-6 pt-24">
      <div
        className="absolute inset-0 z-[-5] pointer-events-none"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">
              <span className="inline-block h-2 w-2 rounded-full bg-primary mr-2 animate-glow-pulse" />
              available_for_work
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6">
              Muhammad
              <br />
              <span className="text-gradient">Waleed.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Full Stack Engineer crafting{" "}
              <span className="text-foreground">immersive web platforms</span>, real-time systems
              and AI-powered tools across the MERN, PHP and Python ecosystems.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#projects"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-primary transition-shadow text-sm sm:text-base"
              >
                Explore work →
              </a>
              <a
                href="/Muhammad-Waleed-Resume.pdf"
                download
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full glass font-medium hover:border-primary/60 transition-colors text-sm sm:text-base"
              >
                ↓ Download CV
              </a>
              <a
                href="https://www.linkedin.com/in/waleed-khattak"
                target="_blank"
                rel="noreferrer"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full glass font-medium hover:border-primary/60 transition-colors text-sm sm:text-base"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
          <Reveal delay={500}>
            <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-md">
              {[
                { n: "15+", l: "projects" },
                { n: "3+", l: "years building" },
                { n: "∞", l: "curiosity" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-gradient">{s.n}</div>
                  <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="hidden lg:block" />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted-foreground flex flex-col items-center gap-2 animate-float">
        <span>scroll</span>
        <span className="h-10 w-px bg-linear-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}

/* ─── About ─────────────────────────────────────────────────────────── */
function About() {
  return (
    <section
      id="about"
      className="relative w-full max-w-full overflow-hidden py-24 sm:py-32 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 sm:gap-12 items-center w-full overflow-hidden">
        <div className="lg:col-span-2 min-w-0 w-full">
          <Reveal className="min-w-0 w-full">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
              // about
            </p>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              I build things that{" "}
              <span className="text-gradient">feel alive</span> on the web.
            </h2>
          </Reveal>

          <Reveal delay={100} className="min-w-0 w-full">
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                Based in Gujranwala, Pakistan - finishing a 16-year Bachelors
                at the University of Gujrat while shipping real-world products
                for clients and startups.
              </p>

              <p>
                I care about the boring parts: clean architecture, predictable
                APIs, accessible UIs - and the magical parts: shaders,
                micro-interactions and interfaces that respond to you.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-3 min-w-0 overflow-hidden w-full max-w-full">
          <Reveal
            delay={200}
            className="min-w-0 overflow-hidden w-full max-w-full"
          >
            <LiveCode />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ─────────────────────────────────────────────────────────── */
function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">// stack</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16">
            Tools of the <span className="text-gradient">trade</span>.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SKILLS.map((s, i) => (
            <Reveal key={s.group} delay={i * 80}>
              <div className="glass rounded-2xl p-5 sm:p-6 h-full hover:border-primary/50 transition-colors group">
                <div className="font-mono text-xs uppercase tracking-wider text-primary mb-4">
                  {s.group}
                </div>
                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-2 text-foreground/90 group-hover:translate-x-1 transition-transform text-sm"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent-magenta shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Projects ─────────────────────────────────────────────────────── */
function Projects() {
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const openPreview = useCallback((project: Project) => setPreviewProject(project), []);
  const closePreview = useCallback(() => setPreviewProject(null), []);

  return (
    <>
      <section id="projects" className="relative py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
              // selected work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16">
              Shipped & <span className="text-gradient">in orbit</span>.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <article className="group relative glass rounded-3xl p-6 sm:p-8 h-full overflow-hidden hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 flex flex-col">
                  {/* hover glow blob */}
                  <div
                    className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none"
                    style={{ background: i % 2 ? "var(--accent-magenta)" : "var(--primary)" }}
                  />
                  <div className="relative flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-5 sm:mb-6 gap-2">
                      <span className="font-mono text-xs px-3 py-1 rounded-full border border-primary/30 text-primary whitespace-nowrap">
                        {p.tag}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{p.year}</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-3 group-hover:text-gradient transition-all">
                      {p.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-sm flex-1">{p.desc}</p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-xs px-2 py-1 rounded bg-secondary/60 text-foreground/80"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                      {/* Live preview */}
                      {p.demo !== "#" ? (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-xs px-3 py-1.5 rounded-full bg-primary/15 text-primary hover:bg-primary/25 transition-colors flex items-center gap-1"
                        >
                          ↗ Live Preview
                        </a>
                      ) : (
                        <button
                          disabled
                          className="font-mono text-xs px-3 py-1.5 rounded-full bg-secondary/40 text-muted-foreground cursor-not-allowed opacity-50"
                        >
                          ↗ Coming Soon
                        </button>
                      )}

                      {/* Code preview - opens modal */}
                      <button
                        onClick={() => openPreview(p)}
                        className="font-mono text-xs px-3 py-1.5 rounded-full border border-border/60 text-foreground/80 hover:border-primary/60 hover:text-primary transition-colors cursor-pointer"
                      >
                        {"</>"} Code Preview
                      </button>

                      {/* GitHub link */}
                      <a
                        href={p.code}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs px-3 py-1.5 rounded-full border border-border/40 text-muted-foreground hover:border-primary/40 hover:text-foreground/80 transition-colors"
                      >
                        GitHub →
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Code preview modal */}
      {previewProject && (
        <CodePreviewModal project={previewProject} onClose={closePreview} />
      )}
    </>
  );
}

/* ─── Experience ──────────────────────────────────────────────────── */
function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
            // timeline
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16">
            The <span className="text-gradient">journey</span> so far.
          </h2>
        </Reveal>
        <div className="relative space-y-6 sm:space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-linear-to-b before:from-primary before:via-accent-magenta before:to-transparent">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.role + e.date} delay={i * 80}>
              <div className="relative pl-10 sm:pl-12">
                <div className="absolute left-0 top-2 h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
                </div>
                <div className="glass rounded-2xl p-5 sm:p-6">
                  <div className="font-mono text-xs text-primary mb-2">{e.date}</div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold">{e.role}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{e.org}</p>
                  <p className="text-foreground/80 leading-relaxed text-sm">{e.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
            // the next thing
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.95] mb-8">
            Have an idea?
            <br />
            <span className="text-gradient">Let's build it.</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed text-sm sm:text-base">
            Drop me a message - replies usually land in your inbox within a day.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <ContactForm />
        </Reveal>
        <Reveal delay={300}>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 font-mono text-xs text-muted-foreground">
            <a href="mailto:khattak4422004@gmail.com" className="hover:text-primary transition-colors">
              khattak4422004@gmail.com
            </a>
            <span>·</span>
            <a href="tel:+923299557156" className="hover:text-primary transition-colors">
              +92 329 9557156
            </a>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-14 sm:mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-muted-foreground font-mono">
            <span>© 2026 Muhammad Waleed</span>
            <span>crafted with three.js, glsl & ☕</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Root Page ───────────────────────────────────────────────────── */
function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {mounted && (
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      )}

      <ScrollProgress />
      <Nav />

      <CinematicHero />

      <GiantTextReveal
        lines={["I CRAFT", "IMMERSIVE", "DIGITAL WORLDS"]}
        highlightIndex={1}
      />

      <About />

      <Marquee
        text="MERN · Frontend · Backend · PHP · Python · WEBGL · GLSL · AI · REAL-TIME · ★"
        speed={35}
      />

      <Skills />

      <GiantTextReveal
        lines={["SHIPPED CODE,", "REAL PRODUCTS,", "REAL USERS."]}
        highlightIndex={1}
      />

      <Projects />
      <Experience />

      <Marquee
        text="LET'S BUILD SOMETHING WILD ✦ AVAILABLE FOR WORK ✦"
        speed={30}
      />

      <Contact />
    </main>
  );
}