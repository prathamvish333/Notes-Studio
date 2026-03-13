'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import InfraStatus from '../components/InfraStatus';
import TerminalSection from '../components/TerminalSection';

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
    title: 'Pratham\'s OS — Interactive Portfolio',
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

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Transforms for 3D Parallax
  const rotateX = useTransform(smoothProgress, [0, 1], [0, 15]);
  const scale = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);
  const opacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#050508] text-white selection:bg-emerald-500/30">
      
      {/* ─── DYNAMIC 3D BACKGROUND ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ rotateX, scale }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_70%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,100,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
      </div>

      {/* ─── HERO SECTION ─── */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div 
          style={{ opacity, y: useTransform(smoothProgress, [0, 0.2], [0, -100]) }}
          className="relative z-10 max-w-4xl"
        >
          <motion.p 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-6 font-mono text-xs tracking-[0.5em] text-emerald-400 uppercase"
          >
            Senior Systems & DevOps Engineer
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl sm:text-8xl font-bold tracking-tighter leading-none mb-8"
          >
            PRATHAM<br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">VISHWAKARMA</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg text-gray-400 font-light leading-relaxed mb-12"
          >
            SDE-1 at <span className="text-white font-medium">Jio Platforms</span> · Specializing in 3D infrastructure visualization, automated cloud deployments, and high-concurrency backend services.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/desktop" className="group relative overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10">LAUNCH INTERACTIVE OS</span>
              <div className="absolute inset-0 bg-emerald-400 translate-y-full transition-transform group-hover:translate-y-0" />
            </Link>
            <a href="/Prathams_Resume.pdf" target="_blank" className="px-8 py-3.5 rounded-full border border-white/10 text-sm font-mono text-gray-400 hover:text-white hover:border-white/30 transition-all">
              DOWNLOAD_CV.PDF
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">Scroll Entry</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-emerald-500/50 to-transparent" />
        </motion.div>
      </section>

      {/* ─── EXPERIENCE (PRIORITY) ─── */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-16"
          >
            <h2 className="font-mono text-xs tracking-[0.4em] text-emerald-400/60 uppercase mb-4">// Profession_Experience</h2>
            <div className="relative pl-8 border-l border-emerald-500/20">
              <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2 mb-4">
                <h3 className="text-2xl font-bold">Software Development Engineer I</h3>
                <span className="font-mono text-xs text-emerald-400/80">Jio Platforms Ltd · 2024—PRESENT</span>
              </div>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Leading automation initiatives for the <span className="text-white">CloudXP platform</span>. Architecting custom workflow execution systems and Python-based orchestration tools that serve 100M+ users across the network ecosystem.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-500">
                <div className="flex gap-3 items-start"><span className="text-emerald-500 font-bold">»</span> Automated multi-regional cloud provision in AWS/OpenStack using Terraform.</div>
                <div className="flex gap-3 items-start"><span className="text-emerald-500 font-bold">»</span> Optimized FastAPI microservices latency by 40% through async I/O patterns.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── LIVE INFRA STATUS ─── */}
      <section className="relative overflow-hidden bg-white/[0.01]">
         <InfraStatus />
      </section>

      {/* ─── PROJECTS & 3D TERMINAL ─── */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-xs tracking-[0.4em] text-emerald-400/60 uppercase mb-20 text-center">// Architecture_Case_Studies</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Terminal on the left */}
            <div className="lg:sticky lg:top-20">
               <TerminalSection />
            </div>

            {/* Projects list on the right */}
            <div className="space-y-8">
              {projects.map((p, i) => (
                <motion.div 
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-100px" }}
                  className={`relative p-8 rounded-2xl border transition-all ${p.isFlagship ? 'bg-emerald-500/[0.03] border-emerald-500/20' : 'bg-white/[0.02] border-white/5'} hover:border-emerald-500/40`}
                >
                  {p.isFlagship && (
                    <div className="absolute -top-3 left-8 bg-emerald-500 text-black font-mono text-[9px] font-bold px-2 py-1 rounded">
                      FLAGSHIP_PROJECT
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="font-mono text-xs text-emerald-400/60 mb-6">{p.stack}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.description}</p>
                  
                  <div className="flex gap-4">
                    <a href={p.liveUrl} className="text-xs font-mono text-emerald-400 hover:underline">EXT_LINK.LIVE</a>
                    <a href={p.githubUrl} target="_blank" className="text-xs font-mono text-gray-500 hover:text-white">GIT_REPO.SRC</a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TECHNICAL SKILLS GRID ─── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
             {Object.entries(skills).map(([cat, items]) => (
               <div key={cat}>
                 <h3 className="font-mono text-[10px] text-gray-600 uppercase tracking-widest mb-6">{cat}</h3>
                 <div className="flex flex-wrap gap-2">
                   {items.map(s => (
                     <span key={s} className="px-3 py-1.5 rounded bg-white/5 border border-white/5 text-xs text-gray-400 font-mono hover:border-emerald-500/20 hover:text-emerald-400 transition-all cursor-default">
                       {s}
                     </span>
                   ))}
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <div className="flex gap-8 font-mono text-xs text-gray-500">
             <a href="https://github.com/prathamvish333" className="hover:text-emerald-400 transition-colors">GITHUB</a>
             <a href="https://linkedin.com/in/prathamvishwakarma" className="hover:text-emerald-400 transition-colors">LINKEDIN</a>
             <Link href="/engineering" className="hover:text-emerald-400 transition-colors">ENGINEERING_BLOG</Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] text-gray-700">VER: 3.0.0_PRODUCTION_STABLE</span>
            <span className="text-gray-800 text-[10px]">© {new Date().getFullYear()} PRATHAM VISHWAKARMA</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
