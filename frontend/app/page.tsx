'use client';

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import InfraStatus from '../components/InfraStatus';
import TerminalSection from '../components/TerminalSection';

// --- CUSTOM 3D PARALLAX WRAPPER ---
function ParallaxSection({ children, intensity = 1 }: { children: React.ReactNode, intensity?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Apple-style deep 3D transforms
  // On mobile we reduce rotation but keep scaling/opacity for touch smoothness
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [isMobile ? 5 : 15, 0, isMobile ? -5 : -15]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const z = useTransform(smoothProgress, [0, 0.5, 1], [-200, 0, -200]);

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: "1200px",
        opacity,
      }}
      className="relative min-h-screen w-full flex items-center justify-center py-20"
    >
      <motion.div
        style={{
          rotateX: intensity === 0 ? 0 : rotateX,
          scale,
          z: intensity === 0 ? 0 : z,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const skills = {
  'Languages': ['Python', 'Shell Script', 'JavaScript', 'TypeScript'],
  'Backend': ['FastAPI', 'REST APIs', 'SQLAlchemy', 'JWT Auth'],
  'DevOps': ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Argo CD'],
  'Cloud & Infra': ['AWS', 'Linux', 'Microservices', 'CI/CD'],
  'Monitoring': ['Grafana', 'Prometheus'],
  'Databases': ['PostgreSQL', 'MySQL', 'SQLite'],
};

const projects = [
  {
    title: 'Notes Studio',
    stack: 'FastAPI • PostgreSQL • Redis • Docker',
    description: 'A secure, high-performance note-taking application designed for engineers. Features end-to-end JWT authentication, real-time sync, and a containerized backend with optimized caching and database indexing.',
    liveUrl: 'https://prathamvishwakarma.com/notes',
    githubUrl: 'https://github.com/prathamvish333/Notes-Studio',
    highlights: ['E2E Encryption', 'Redis Caching', 'PostgreSQL Optimization'],
    isFlagship: true
  },
  {
    title: 'Interactive Portfolio OS',
    stack: 'Next.js • FastAPI • Docker • Kubernetes',
    description: 'A full-stack, OS-themed interactive environment. Deployed on a multi-node Kubernetes cluster with centralized logging and monitoring. Features a custom window manager and virtual filesystem.',
    liveUrl: '/desktop',
    githubUrl: 'https://github.com/prathamvish333/Notes-Studio',
    highlights: ['K8s Cluster', 'Window Manager', 'Virtual FS'],
  }
];

export default function ParallaxPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rotateXBg = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="relative bg-[#020205] text-white selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* ─── EXTREME 3D BACKGROUND ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden perspective-[1000px]">
        <motion.div 
          style={{ rotateX: rotateXBg, y: backgroundY }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08)_0%,transparent_70%)]"
        />
        {/* Floating Grid */}
        <motion.div 
          style={{ rotateX: rotateXBg, translateZ: "-100px" }}
          className="absolute inset-0 bg-[linear-gradient(rgba(0,255,100,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_90%)]" 
        />
        {/* Distant Nebula */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {/* ─── HERO SECTION (Extreme Parallax) ─── */}
        <ParallaxSection intensity={0.5}>
          <div className="text-center px-6">
            <motion.p 
               initial={{ opacity: 0, tracking: "0.2em" }}
               animate={{ opacity: 1, tracking: "0.5em" }}
               className="mb-6 font-mono text-[10px] sm:text-xs text-emerald-400 uppercase font-medium"
            >
              Backend and DevOps Engineer
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight leading-none mb-8"
            >
              PRATHAM<br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">VISHWAKARMA</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto text-base sm:text-lg text-gray-400 font-light leading-relaxed mb-12 px-4"
            >
              SDE-1 at <span className="text-white font-medium">Jio Platforms</span> · Architecting scalable 3D infrastructure, high-concurrency cloud services, and automated DevOps ecosystems.
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link href="/desktop" className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-white px-8 py-4 text-xs font-bold text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <span className="relative z-10">LAUNCH INTERACTIVE OS</span>
                <div className="absolute inset-0 bg-emerald-400 translate-y-full transition-transform group-hover:translate-y-0" />
              </Link>
              <a href="/Prathams_Resume.pdf" target="_blank" className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 text-xs font-mono text-gray-400 hover:text-white hover:border-white/30 transition-all">
                DOWNLOAD_ENGINEERING_CV.PDF
              </a>
            </div>
          </div>
        </ParallaxSection>

        {/* ─── EXPERIENCE (3D TRANSITION) ─── */}
        <ParallaxSection>
          <div className="max-w-4xl mx-auto px-6 w-full">
            <h2 className="font-mono text-[10px] tracking-[0.4em] text-emerald-400/60 uppercase mb-12">// Engineering_Roadmap</h2>
            <div className="relative pl-6 sm:pl-10 border-l border-emerald-500/20">
              <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]" />
              <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2 mb-6">
                <h3 className="text-2xl sm:text-4xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">Software Development Engineer I</h3>
                <span className="font-mono text-[10px] sm:text-xs text-emerald-400/80 bg-emerald-500/10 px-2 py-1 rounded">2024 — PRESENT</span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-cyan-400/60 mb-4 tracking-wider uppercase">Jio Platforms Ltd (JPL)</div>
              <p className="text-base sm:text-xl text-gray-400 mb-10 leading-relaxed font-light">
                Engineering <span className="text-white font-normal underline decoration-emerald-500/50 underline-offset-4">CloudXP Platform</span> autonomy. Designing distributed workflow execution systems that manage enterprise cloud resources at massive scale.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-500 font-light">
                <div className="flex gap-4 items-start group">
                  <span className="text-emerald-500 font-mono group-hover:translate-x-1 transition-transform">01</span>
                  <span>Developed multi-regional cloud orchestration engines reducing deployment time by 60%.</span>
                </div>
                <div className="flex gap-4 items-start group">
                  <span className="text-emerald-500 font-mono group-hover:translate-x-1 transition-transform">02</span>
                  <span>Built high-reliability Python tools for AWS/OpenStack node management and health recovery.</span>
                </div>
              </div>
            </div>
          </div>
        </ParallaxSection>

        {/* ─── INFRASTRUCTURE VISUALIZATION ─── */}
        <ParallaxSection intensity={0.3}>
          <div className="w-full">
            <div className="max-w-4xl mx-auto px-6 mb-12">
               <h2 className="font-mono text-[10px] tracking-[0.4em] text-emerald-400/60 uppercase text-center">// Live_Cluster_Telemetry</h2>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl" />
              <InfraStatus />
            </div>
          </div>
        </ParallaxSection>

        {/* ─── ARCHITECTURE & PROJECTS ─── */}
        <ParallaxSection>
          <div className="max-w-6xl mx-auto px-6 w-full">
            <h2 className="font-mono text-[10px] tracking-[0.4em] text-emerald-400/60 uppercase mb-20 text-center">// Architecture_Case_Studies</h2>
            
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Terminal (Command Line Showcase) */}
              <div className="lg:sticky lg:top-32 relative group">
                <div className="absolute -inset-4 bg-emerald-500/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                 <TerminalSection />
              </div>

              {/* Projects list */}
              <div className="space-y-10">
                {projects.map((p, i) => (
                  <motion.div 
                    key={p.title}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className={`relative p-8 rounded-3xl border transition-all ${p.isFlagship ? 'bg-emerald-500/[0.04] border-emerald-500/20' : 'bg-white/[0.02] border-white/5'} hover:border-emerald-500/30 group`}
                  >
                    {p.isFlagship && (
                      <div className="absolute -top-3 left-8 bg-emerald-500 text-black font-mono text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                        FLAGSHIP_SYSTEM
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{p.title}</h3>
                    <p className="font-mono text-[10px] text-cyan-400/50 mb-6 tracking-widest">{p.stack}</p>
                    <p className="text-gray-400 text-base leading-relaxed mb-8 font-light">{p.description}</p>
                    
                    <div className="flex gap-6 items-center">
                      <a href={p.liveUrl} className="group/link flex items-center gap-2 text-xs font-mono text-emerald-400">
                        <span>[VIEW_DEPLOYMENT]</span>
                        <motion.span className="group-hover/link:translate-x-1 transition-transform">→</motion.span>
                      </a>
                      <a href={p.githubUrl} target="_blank" className="text-xs font-mono text-gray-600 hover:text-white transition-colors">
                        SOURCE_ARCHIVE.TGZ
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ParallaxSection>

        {/* ─── SKILLS MATRIX ─── */}
        <ParallaxSection>
          <div className="max-w-4xl mx-auto px-6 w-full">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
               {Object.entries(skills).map(([cat, items]) => (
                 <div key={cat} className="group">
                   <h3 className="font-mono text-[10px] text-gray-600 uppercase tracking-[0.3em] mb-8 group-hover:text-emerald-500/80 transition-colors italic">{cat}</h3>
                   <div className="flex flex-wrap gap-2">
                     {items.map(s => (
                       <span key={s} className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-[10px] sm:text-xs text-gray-400 font-mono hover:border-emerald-500/30 hover:text-emerald-300 hover:bg-emerald-500/5 transition-all cursor-default uppercase">
                         {s}
                       </span>
                     ))}
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </ParallaxSection>

        {/* ─── FOOTER ─── */}
        <footer className="relative py-32 px-6 border-t border-white/5 bg-[#000]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-10 font-mono text-xs text-gray-500 mb-16">
               <a href="https://github.com/prathamvish333" target="_blank" className="hover:text-emerald-400 transition-colors hover:tracking-widest duration-500">GITHUB</a>
               <a href="https://linkedin.com/in/prathamvishwakarma" target="_blank" className="hover:text-emerald-400 transition-colors hover:tracking-widest duration-500">LINKEDIN</a>
               <Link href="/engineering" className="hover:text-emerald-400 transition-colors hover:tracking-widest duration-500">ENGINEERING_BLOG</Link>
            </div>
            <div className="space-y-4">
              <div className="font-mono text-[10px] text-gray-700 tracking-[0.5em] uppercase">Built for Scale · 2026 Edition</div>
              <div className="text-emerald-500/30 text-[9px] font-mono tracking-tighter">
                PRATHAM VISHWAKARMA_PORTFOLIO_V3.6_STABLE
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
