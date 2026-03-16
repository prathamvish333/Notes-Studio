'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import InfraStatus from '@/components/InfraStatus';

/* ─────────────────────────────────────────────
   ARCHITECTURE DIAGRAM COMPONENT
   ───────────────────────────────────────────── */
const archNodes = [
  { id: 'client', label: 'Client (Next.js)', desc: 'Server-rendered React UI with file-based routing, SSR, and optimized bundle splitting.', tech: 'Next.js 14 • React 18 • TypeScript' },
  { id: 'api', label: 'FastAPI Backend', desc: 'High-performance async Python API with automatic OpenAPI documentation and request validation.', tech: 'Python 3.11 • FastAPI • Uvicorn • Pydantic' },
  { id: 'auth', label: 'JWT Authentication', desc: 'Stateless token-based auth with bcrypt password hashing, refresh tokens, and role-based access control.', tech: 'PyJWT • bcrypt • OAuth2' },
  { id: 'orm', label: 'SQLAlchemy ORM', desc: 'Type-safe database interactions with migration support, relationship mapping, and query optimization.', tech: 'SQLAlchemy 2.0 • Alembic' },
  { id: 'db', label: 'PostgreSQL Database', desc: 'ACID-compliant relational storage with indexing, connection pooling, and automated backups.', tech: 'PostgreSQL 15 • pgBouncer' },
];

function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0">
      {archNodes.map((node, i) => (
        <div key={node.id}>
          <div
            className={`arch-node ${activeNode === node.id ? 'active' : ''}`}
            onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-heading text-sm md:text-base font-bold text-white">
                {node.label}
              </h4>
              <span className="text-[10px] text-blue-500 font-heading font-bold tracking-wider">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            {activeNode === node.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 space-y-2"
              >
                <p className="text-xs text-gray-400 leading-relaxed">{node.desc}</p>
                <p className="text-[10px] text-blue-400/60 font-heading font-medium tracking-wider">{node.tech}</p>
              </motion.div>
            )}
          </div>
          {i < archNodes.length - 1 && <div className="arch-connector" />}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   INFRASTRUCTURE LAYER COMPONENT
   ───────────────────────────────────────────── */
const infraLayers = [
  {
    id: 'request',
    num: '01',
    title: 'User Request',
    subtitle: 'Where it all begins',
    desc: 'Every interaction starts with an HTTP request. Our edge layer handles SSL termination, rate limiting, and geographic routing before the request reaches the application.',
    skills: ['HTTPS', 'DNS', 'CDN', 'Edge Computing'],
    color: 'from-blue-500/10 to-transparent',
  },
  {
    id: 'api',
    num: '02',
    title: 'API Gateway',
    subtitle: 'FastAPI Backend Service',
    desc: 'Async Python API handling request validation, business logic, and response serialization. Auto-generates OpenAPI documentation. Handles 10K+ requests/sec with sub-50ms p99 latency.',
    skills: ['Python', 'FastAPI', 'REST APIs', 'Pydantic', 'Uvicorn'],
    color: 'from-indigo-500/10 to-transparent',
  },
  {
    id: 'container',
    num: '03',
    title: 'Container Layer',
    subtitle: 'Docker Isolation',
    desc: 'Multi-stage Docker builds with minimal base images. Each service runs in an isolated container with defined resource limits, health checks, and restart policies.',
    skills: ['Docker', 'Multi-stage Builds', 'Alpine Linux', 'Docker Compose'],
    color: 'from-cyan-500/10 to-transparent',
  },
  {
    id: 'orchestration',
    num: '04',
    title: 'Orchestration',
    subtitle: 'Kubernetes Cluster',
    desc: 'Declarative infrastructure with automated scaling, rolling deployments, and self-healing. Services communicate via internal DNS with mTLS encryption.',
    skills: ['Kubernetes', 'Helm', 'Ingress', 'HPA', 'Service Mesh'],
    color: 'from-purple-500/10 to-transparent',
  },
  {
    id: 'database',
    num: '05',
    title: 'Database Layer',
    subtitle: 'Persistent Storage',
    desc: 'ACID-compliant PostgreSQL with connection pooling, query optimization, and automated backup schedules. SQLAlchemy ORM provides type-safe data access.',
    skills: ['PostgreSQL', 'SQLAlchemy', 'Alembic', 'Connection Pooling'],
    color: 'from-emerald-500/10 to-transparent',
  },
  {
    id: 'monitoring',
    num: '06',
    title: 'Observability',
    subtitle: 'Monitoring & DevOps',
    desc: 'Full-stack observability with metrics collection, log aggregation, and alerting. CI/CD pipelines automate testing, building, and deployment on every push.',
    skills: ['Prometheus', 'Grafana', 'Jenkins', 'CI/CD', 'Terraform'],
    color: 'from-orange-500/10 to-transparent',
  },
];

function InfraLayer({ layer, index }: { layer: typeof infraLayers[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="infra-layer"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${layer.color} pointer-events-none`} />
      <div className="infra-layer-content">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-heading text-6xl md:text-8xl font-black text-white/5">{layer.num}</span>
              <div>
                <h3 className="font-heading text-2xl md:text-4xl font-black text-white tracking-tight">{layer.title}</h3>
                <p className="font-heading text-xs text-blue-400/60 tracking-[0.3em] uppercase font-bold mt-1">{layer.subtitle}</p>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-lg">{layer.desc}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {layer.skills.map(skill => (
              <span key={skill} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SKILLS SECTION
   ───────────────────────────────────────────── */
const skillCategories = [
  { title: 'Languages', icon: '⟨/⟩', skills: ['Python', 'Shell', 'JavaScript', 'TypeScript'] },
  { title: 'Backend', icon: '⚡', skills: ['FastAPI', 'REST APIs', 'SQLAlchemy', 'JWT Auth'] },
  { title: 'DevOps', icon: '☸', skills: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Jenkins'] },
  { title: 'Tools', icon: '⚙', skills: ['Git', 'Linux', 'PostgreSQL', 'Prometheus', 'Grafana'] },
];

/* ─────────────────────────────────────────────
   MAIN LANDING PAGE
   ───────────────────────────────────────────── */
export default function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Parallax transforms for hero background
  const bgY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    // Only scroll to top on fresh mount
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className={`relative bg-black text-white selection:bg-blue-500 selection:text-white overflow-x-hidden ${isRecruiterMode ? 'recruiter-view' : ''}`}>
      
      {/* Recruiter Mode Toggle */}
      <div className="fixed top-6 right-6 z-[60] flex items-center gap-3">
        <span className="font-heading text-[10px] text-gray-500 tracking-widest uppercase font-bold">Recruiter Mode</span>
        <button 
          onClick={() => setIsRecruiterMode(!isRecruiterMode)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isRecruiterMode ? 'bg-blue-600' : 'bg-gray-800'}`}
        >
          <motion.div 
            animate={{ x: isRecruiterMode ? 26 : 2 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
          />
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 01: HERO — IDENTITY
          ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen w-full flex flex-col justify-center px-6 md:px-20 lg:px-32 z-10 overflow-hidden">
        {/* Parallax Background - Hidden in Recruiter Mode for performance */}
        {!isRecruiterMode && (
          <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black/80 to-black z-10" />
            <img
              src="/hero_arch.png"
              alt=""
              className="w-full h-full object-cover opacity-25 grayscale"
            />
          </motion.div>
        )}

        <motion.div
          className="relative z-10 flex flex-col"
          style={{ opacity: heroOpacity }}
        >
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter">
              Pratham<br />
              <span className="text-blue-500">Vishwakarma</span>
            </h1>
          </motion.div>

          {/* Title & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 md:mt-8 space-y-2"
          >
            <p className="font-heading text-sm md:text-lg font-bold text-gray-300 tracking-wide">
              Backend & DevOps Engineer
            </p>
            <p className="font-heading text-xs md:text-sm text-gray-500 tracking-widest uppercase font-medium">
              SDE-1 @ Jio Platforms
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {['Python', 'FastAPI', 'Docker', 'Kubernetes', 'Automation'].map(tech => (
              <span key={tech} className="skill-badge text-[10px] md:text-xs">
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 md:mt-12 flex flex-wrap gap-4"
          >
            <Link href="/desktop" className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-xl font-heading text-sm md:text-base font-black tracking-wider uppercase transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-2">
              <span className="text-xl"></span> Launch Pratham&apos;s OS
            </Link>
            <a href="#projects" className="px-6 py-4 border border-white/20 hover:border-white/40 rounded-xl font-heading text-xs md:text-sm font-bold tracking-wider uppercase transition-all">
              View Projects
            </a>
            <a href="https://github.com/prathamvish333" target="_blank" className="px-6 py-4 border border-white/10 hover:border-white/30 rounded-xl font-heading text-xs md:text-sm font-bold tracking-wider uppercase text-gray-400 hover:text-white transition-all">
              GitHub
            </a>
            <a href="/Prathams_Resume.pdf" download className="px-6 py-4 border border-blue-500/30 hover:border-blue-500/60 rounded-xl font-heading text-xs md:text-sm font-bold tracking-wider uppercase text-blue-400 hover:text-blue-300 transition-all">
              ↓ Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="font-heading text-[9px] text-gray-600 tracking-[0.5em] uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 02: INFRASTRUCTURE PARALLAX SCROLL
          ═══════════════════════════════════════════ */}
      <section className={`relative z-20 ${isRecruiterMode ? 'hidden' : ''}`}>
        <div className="py-16 md:py-24 px-6 md:px-20 lg:px-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mb-8"
          >
            <span className="font-heading text-[10px] text-blue-500 tracking-[0.5em] uppercase font-bold">How I Think</span>
            <h2 className="font-heading text-3xl md:text-6xl font-black text-white tracking-tight mt-3">
              Infrastructure<br />
              <span className="text-gray-600">from request to response.</span>
            </h2>
          </motion.div>
        </div>

        {infraLayers.map((layer, i) => (
          <InfraLayer key={layer.id} layer={layer} index={i} />
        ))}
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 03: EXPERIENCE — JIO PLATFORMS
          ═══════════════════════════════════════════ */}
      <section className="relative z-20 px-6 md:px-20 lg:px-32 py-24 md:py-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="font-heading text-[10px] text-blue-500 tracking-[0.5em] uppercase font-bold">Experience</span>
              <h2 className="font-heading text-4xl md:text-7xl font-black text-white leading-none tracking-tighter mt-4">
                Jio<br/>Platforms<span className="text-blue-500">.</span>
              </h2>
              <p className="mt-4 font-heading text-xs text-gray-400 tracking-[0.3em] uppercase font-bold">
                SDE-1 • Backend & DevOps Engineer • Dec 2023 — Present
              </p>
            </div>
            <p className="text-sm md:text-lg text-gray-400 leading-relaxed">
              Architecting high-throughput microservices and orchestrating multi-region Kubernetes clusters for <span className="text-white font-medium">CloudXP</span> — India&apos;s largest digital infrastructure platform. Leading regional orchestration systems handling millions of daily operations.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                <p className="font-heading text-2xl font-black text-blue-500">99.9%</p>
                <p className="text-[10px] text-gray-500 font-heading tracking-wider uppercase mt-1">Uptime SLA</p>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                <p className="font-heading text-2xl font-black text-blue-500">&lt;50ms</p>
                <p className="text-[10px] text-gray-500 font-heading tracking-wider uppercase mt-1">P99 Latency</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="/systems_arch.png"
              className="w-full h-auto opacity-60 hover:opacity-100 transition-opacity duration-1000"
              alt="Systems Architecture"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 04: NOTES STUDIO — PROJECT
          ═══════════════════════════════════════════ */}
      <section id="projects" className="relative z-20 px-6 md:px-20 lg:px-32 py-24 md:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <span className="font-heading text-[10px] text-blue-500 tracking-[0.5em] uppercase font-bold">Flagship Project</span>
          <h2 className="font-heading text-4xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter mt-4">
            Notes Studio<span className="text-indigo-500">.</span>
          </h2>
          <p className="mt-6 text-sm md:text-lg text-gray-400 leading-relaxed max-w-2xl">
            A production-grade collaborative note platform. Features real-time sync, JWT authentication, and a full REST API — deployed on Kubernetes with automated CI/CD.
          </p>

          <div className="mt-12 grid lg:grid-cols-2 gap-16 items-start">
            {/* Architecture Diagram */}
            <ArchitectureDiagram />

            {/* Project Details */}
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] text-center">
                  <p className="font-heading text-lg font-black text-white">REST</p>
                  <p className="text-[9px] text-gray-500 font-heading tracking-wider uppercase mt-1">API Design</p>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] text-center">
                  <p className="font-heading text-lg font-black text-white">JWT</p>
                  <p className="text-[9px] text-gray-500 font-heading tracking-wider uppercase mt-1">Auth System</p>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] text-center">
                  <p className="font-heading text-lg font-black text-white">K8s</p>
                  <p className="text-[9px] text-gray-500 font-heading tracking-wider uppercase mt-1">Deployment</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/notes" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all">
                  Live Demo →
                </Link>
                <a href="https://github.com/prathamvish333/Notes-Studio" target="_blank" className="px-6 py-3 border border-white/10 hover:border-white/30 rounded-xl font-heading text-xs font-bold tracking-wider uppercase text-gray-400 hover:text-white transition-all">
                  Source Code
                </a>
              </div>

              <p className="text-[10px] text-gray-600 font-heading tracking-wider">
                ⓘ Notes are viewable without login. Authentication required to create or edit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 05: INFRASTRUCTURE TELEMETRY
          ═══════════════════════════════════════════ */}
      <section className="relative z-20 px-6 md:px-20 lg:px-32 py-24 md:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-heading text-[10px] text-blue-500 tracking-[0.5em] uppercase font-bold">Live Status</span>
              <h2 className="font-heading text-3xl md:text-6xl font-black text-white tracking-tight mt-3">
                System Telemetry
              </h2>
            </div>
            <p className="text-[10px] text-gray-600 font-heading tracking-[0.3em] uppercase font-bold">
              Cluster Health: 100%
            </p>
          </div>
          <InfraStatus />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 06: SKILLS
          ═══════════════════════════════════════════ */}
      <section className="relative z-20 px-6 md:px-20 lg:px-32 py-24 md:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <span className="font-heading text-[10px] text-blue-500 tracking-[0.5em] uppercase font-bold">Capabilities</span>
          <h2 className="font-heading text-3xl md:text-6xl font-black text-white tracking-tight mt-3 mb-16">
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map(cat => (
              <div key={cat.title} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{cat.icon}</span>
                  <h3 className="font-heading text-sm font-bold text-white tracking-wider uppercase">{cat.title}</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {cat.skills.map(skill => (
                    <span key={skill} className="skill-badge text-xs justify-start">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 07: FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="relative z-30 bg-black border-t border-white/5 py-16 md:py-24 px-6 md:px-20 lg:px-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <h3 className="font-heading text-2xl md:text-4xl font-black text-white">
                Let&apos;s Build.
              </h3>
              <p className="mt-2 text-sm text-gray-500">Open to opportunities in Backend & DevOps Engineering.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              <a href="mailto:prathamvishwakarma2000@gmail.com" className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-gray-500 hover:text-blue-400 transition-colors">
                Email
              </a>
              <a href="https://github.com/prathamvish333" target="_blank" className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-gray-500 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/prathamvishwakarma" target="_blank" className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-gray-500 hover:text-white transition-colors">
                LinkedIn
              </a>
              <Link href="/engineering" className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-gray-500 hover:text-white transition-colors">
                Engineering
              </Link>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-heading text-[10px] text-gray-800 tracking-[0.5em] uppercase font-bold">
              Pratham Vishwakarma © 2026
            </p>
            <a href="/Prathams_Resume.pdf" download className="font-heading text-[10px] text-blue-500/50 hover:text-blue-400 tracking-[0.3em] uppercase font-bold transition-colors">
              Download Resume ↓
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
