'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import Link from 'next/link';
import InfraStatus from '../components/InfraStatus';
import TerminalSection from '../components/TerminalSection';
import AnimatedBackground from '../components/AnimatedBackground';

// --- CUSTOM 3D LENS-POP WRAPPER ---
function LensSection({ children, intensity = 1 }: { children: React.ReactNode, intensity?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  
  // High-friction scale & tilt for professional depth
  const scale = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.92, 1, 1, 0.92]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        rotateX,
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
      className="relative min-h-screen w-full flex items-center justify-center py-32 px-6"
    >
      <div className="w-full max-w-7xl mx-auto">
        {children}
      </div>
    </motion.div>
  );
}

const projects = [
  {
    title: 'Notes Studio.',
    stack: 'Next.js • FastAPI • K8s',
    description: 'A professional, high-performance note ecosystem for modern engineers. Architected for 99.9% availability.',
    liveUrl: 'https://prathamvishwakarma.com/notes',
    highlights: ['E2E Encryption', 'Redis L2 Caching', 'PostgreSQL Clusters'],
    isFlagship: true
  },
  {
    title: 'Interactive OS.',
    stack: 'TypeScript • Framer • Docker',
    description: 'A complete virtual desktop environment with window management and custom filesystem logic.',
    liveUrl: '/desktop',
    highlights: ['Multi-Windowing', 'Custom FS', 'Real-time Telemetry'],
  }
];

export default function BreathtakingPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Force breathtaking theme on landing page
  useEffect(() => {
    localStorage.setItem('wallpaper_theme', 'breathtaking');
    window.dispatchEvent(new Event('theme_changed'));
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black text-white selection:bg-blue-500/30 font-['Inter'] overflow-x-hidden">
      
      {/* ─── ATMOSPHERIC LAYER ─── */}
      <AnimatedBackground />
      <div className="vignette" />

      <div className="relative z-20">
        
        {/* ─── HERO SECTION (Editorial Style) ─── */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-heading font-light tracking-[0.4em] text-[10px] sm:text-xs text-blue-400 uppercase mb-8">
              Backend and DevOps Engineer
            </p>
            
            <h1 className="font-heading text-6xl sm:text-8xl lg:text-[11vw] font-bold tracking-[-0.04em] leading-[0.85] mb-12">
              Pratham<br />
              <span className="text-blue-500">Vishwakarma.</span>
            </h1>

            <div className="max-w-2xl mx-auto space-y-8">
              <p className="text-base sm:text-xl text-gray-400 font-light leading-relaxed px-4">
                SDE-1 at <span className="text-white font-medium">Jio Platforms</span>. 
                Specializing in distributed systems, high-concurrency architecture, and zero-downtime DevOps.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
                <Link href="/desktop" className="group flex items-center gap-4 text-xs font-heading font-semibold tracking-widest uppercase">
                  <span>Launch OS</span>
                  <div className="h-0.5 w-12 bg-blue-500 transition-all group-hover:w-20" />
                </Link>
                <a href="/Prathams_Resume.pdf" target="_blank" className="text-xs font-heading font-medium tracking-widest text-gray-500 hover:text-white transition-colors uppercase">
                   Engineering.CV
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── HORIZONTAL EXPERIENCE TIMELINE ─── */}
        <LensSection>
          <div className="relative w-full overflow-visible">
            <h2 className="font-heading text-xs tracking-[0.5em] text-gray-600 uppercase mb-20">Experience.</h2>
            
            <div className="flex flex-col gap-24">
              <div className="group relative">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-l-2 border-blue-500/20 pl-8 transition-colors group-hover:border-blue-500">
                  <div className="flex-1">
                    <h3 className="font-heading text-4xl sm:text-6xl font-medium mb-4">Software Dev Engineer I</h3>
                    <p className="font-heading text-sm text-blue-400/60 uppercase tracking-widest mb-6">Jio Platforms • Dec 2023 — Present</p>
                    <p className="max-w-3xl text-lg sm:text-2xl text-gray-400 font-light leading-relaxed">
                      Architecting <span className="text-white decoration-blue-500/30 underline underline-offset-8">CloudXP Platform</span>. Building regional orchestration engines and health recovery systems that scale across thousands of nodes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LensSection>

        {/* ─── KINETIC BENTO GRID (TELEMETRY) ─── */}
        <LensSection intensity={0.5}>
          <div className="grid lg:grid-cols-12 gap-6 w-full h-full">
            <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 sm:p-12 overflow-hidden group">
               <h2 className="font-heading text-[10px] tracking-[0.5em] text-gray-600 uppercase mb-12">Cluster_Status.</h2>
               <div className="scale-95 sm:scale-100 origin-top-left transition-transform group-hover:scale-100">
                  <InfraStatus />
               </div>
            </div>
            
            <div className="lg:col-span-4 flex flex-col gap-6">
               <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between group">
                  <h3 className="font-heading font-bold text-3xl">Architecture.</h3>
                  <div className="space-y-4">
                    <div className="h-1 w-full bg-white/5 overflow-hidden rounded-full">
                       <motion.div 
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "0%" }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full w-3/4 bg-blue-500" 
                       />
                    </div>
                    <p className="text-[10px] font-heading text-gray-500 tracking-widest uppercase">System Stability 99.9%</p>
                  </div>
               </div>
               
               <div className="flex-1 bg-blue-500 rounded-[2rem] p-8 text-black flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer">
                  <h3 className="font-heading font-bold text-3xl leading-tight">View Scaling Case Studies.</h3>
                  <span className="text-4xl">↗</span>
               </div>
            </div>
          </div>
        </LensSection>

        {/* ─── CASE STUDIES (Editorial Cards) ─── */}
        <LensSection>
           <div className="max-w-5xl mx-auto space-y-32">
             {projects.map((p, i) => (
                <div key={p.title} className="group relative flex flex-col sm:flex-row gap-12 items-center">
                   <div className="flex-1 space-y-8">
                      <span className="font-heading text-[10px] tracking-[0.5em] text-blue-500 uppercase">{i + 1}. Case Study</span>
                      <h3 className="font-heading text-5xl sm:text-7xl font-bold tracking-tight">{p.title}</h3>
                      <p className="text-lg sm:text-xl text-gray-400 font-light leading-relaxed">{p.description}</p>
                      <Link href={p.liveUrl} className="inline-block font-heading text-xs tracking-widest uppercase border-b border-white/20 pb-2 hover:border-blue-500 transition-colors">
                        Explore Deployment
                      </Link>
                   </div>
                   <div className="flex-1 w-full aspect-square bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden flex items-center justify-center p-8">
                      {p.isFlagship ? <TerminalSection /> : <div className="text-gray-800 font-heading text-8xl font-bold uppercase select-none opacity-20">{p.title[0]}</div>}
                   </div>
                </div>
             ))}
           </div>
        </LensSection>

        {/* ─── FOOTER ─── */}
        <footer className="py-24 px-6 text-center border-t border-white/5">
           <div className="max-w-4xl mx-auto space-y-12">
             <div className="flex justify-center gap-12 text-xs font-heading font-medium tracking-[0.3em] text-gray-500 scroll-smooth">
                <a href="https://github.com/prathamvish333" target="_blank" className="hover:text-blue-400 transition-colors">GITHUB</a>
                <a href="https://linkedin.com/in/prathamvishwakarma" target="_blank" className="hover:text-blue-400 transition-colors">LINKEDIN</a>
                <Link href="/engineering" className="hover:text-blue-400 transition-colors">LOGS.</Link>
             </div>
             <p className="font-heading text-[10px] tracking-[1em] text-gray-700 uppercase">
                Pratham Vishwakarma © 2026
             </p>
           </div>
        </footer>

      </div>
    </div>
  );
}
