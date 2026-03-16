'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import InfraStatus from '../components/InfraStatus';
import TerminalSection from '../components/TerminalSection';
import AnimatedBackground from '../components/AnimatedBackground';

// --- STACKED CARD WRAPPER ---
function StickyCard({ children, index, zIndex }: { children: React.ReactNode, index: number, zIndex: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ 
        scale, 
        opacity,
        zIndex,
      }}
      className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {children}
    </motion.section>
  );
}

const projects = [
  {
    title: 'Notes Studio.',
    stack: 'Next.js • FastAPI • K8s',
    description: 'A professional, high-performance note ecosystem for modern engineers. Architected for 99.9% availability.',
    liveUrl: '/notes',
    isFlagship: true
  },
  {
    title: 'Interactive OS.',
    stack: 'TypeScript • Framer • Docker',
    description: 'A complete virtual desktop environment with window management and custom filesystem logic.',
    liveUrl: '/desktop',
  }
];

export default function CinematicPortfolio() {
  // Force breathtaking theme
  useEffect(() => {
    localStorage.setItem('wallpaper_theme', 'breathtaking');
    window.dispatchEvent(new Event('theme_changed'));
  }, []);

  return (
    <div className="relative bg-black text-white selection:bg-blue-500/30 font-sans">
      
      {/* ─── ATMOSPHERIC BACKGROUND ─── */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>
      <div className="vignette fixed inset-0 z-[40]" />

      <main className="relative z-10">
        
        {/* CARD 1: KINETIC HERO */}
        <StickyCard index={0} zIndex={10}>
          <div className="absolute inset-0 z-0 opacity-40">
             <img 
               src="file:///Users/pratham/.gemini/antigravity/brain/e4b00bc3-e9d1-4cd5-80ae-8c4bd1ce0513/breathtaking_architecture_abstract_1773665753495.png" 
               alt="Cloud Architecture" 
               className="w-full h-full object-cover"
             />
          </div>
          <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-heading font-light tracking-[0.5em] text-[10px] text-blue-400 uppercase mb-6">
                Engineering the Future.
              </p>
              <h1 className="kinetic-text text-[15vw] lg:text-[18vw] leading-[0.8]">
                PRATHAM.
              </h1>
              <h1 className="text-[12vw] lg:text-[14vw] font-heading font-black tracking-tighter leading-[0.8] text-white">
                VISHWAKARMA
              </h1>
              <div className="mt-12 flex justify-center gap-12">
                <Link href="/desktop" className="group flex items-center gap-4 text-[10px] font-heading font-bold tracking-[0.3em] uppercase">
                  <span>Launch_OS</span>
                  <div className="h-[1px] w-10 bg-blue-500 transition-all group-hover:w-16" />
                </Link>
                <a href="/Prathams_Resume.pdf" className="text-[10px] font-heading font-bold tracking-[0.3em] uppercase text-gray-500 hover:text-white transition-colors">
                  Resume.pdf
                </a>
              </div>
            </motion.div>
          </div>
        </StickyCard>

        {/* CARD 2: IMMERSIVE EXPERIENCE */}
        <StickyCard index={1} zIndex={20}>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black z-0" />
          <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-12">
                <span className="font-heading text-[10px] tracking-[1em] text-blue-500 uppercase">Experience.</span>
                <div className="space-y-4">
                  <h2 className="font-heading text-5xl md:text-8xl font-black leading-tight tracking-tighter">
                    SDE-1 @<br/>JIO PLATFORMS
                  </h2>
                  <p className="font-heading text-blue-400/60 uppercase tracking-widest text-xs">Dec 2023 — Present</p>
                </div>
                <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl">
                  Leading regional orchestration for <span className="text-white font-medium border-b border-blue-500/30">CloudXP</span>. Engineering distributed recovery systems that handle millions of operations with sub-millisecond latency.
                </p>
              </div>
              <div className="flex-1 w-full max-w-md aspect-square bg-white/[0.02] border border-white/5 rounded-[4rem] p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <TerminalSection />
              </div>
            </div>
          </div>
        </StickyCard>

        {/* CARD 3: HUD TELEMETRY DASHBOARD */}
        <StickyCard index={2} zIndex={30}>
          <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-30">
             <img 
               src="file:///Users/pratham/.gemini/antigravity/brain/e4b00bc3-e9d1-4cd5-80ae-8c4bd1ce0513/devops_blueprint_isometric_1773665771110.png" 
               alt="DevOps Hub" 
               className="w-full h-full object-cover"
             />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
            <div className="grid lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-4 space-y-8">
                <h3 className="font-heading text-[10px] tracking-[1em] text-gray-500 uppercase">Infrastructure.</h3>
                <h2 className="font-heading text-6xl font-black tracking-tighter leading-none">GLOBAL<br/>RELIABILITY.</h2>
                <div className="p-8 bg-blue-500 text-black rounded-[2rem] font-heading font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform cursor-pointer">
                   Live Cluster Telemetry ↗
                </div>
              </div>
              <div className="lg:col-span-8 bg-black/40 border border-white/5 rounded-[3rem] p-10 backdrop-blur-[40px] shadow-3xl">
                <InfraStatus />
              </div>
            </div>
          </div>
        </StickyCard>

        {/* CARD 4: FLAGSHIP CASE STUDY */}
        <StickyCard index={3} zIndex={40}>
          <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-20 items-center">
              <div className="order-2 md:order-1 select-none">
                <div className="relative aspect-[4/3] bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden flex items-center justify-center p-12 group">
                   <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <h1 className="text-[12vw] font-black opacity-10 font-heading">01.</h1>
                   <div className="relative z-10 w-full">
                      <TerminalSection />
                   </div>
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-10">
                <span className="font-heading text-[10px] tracking-[1em] text-blue-500 uppercase">Case Study.</span>
                <h2 className="font-heading text-7xl md:text-9xl font-black tracking-tighter leading-[0.8]">NOTES<br/>STUDIO.</h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed">
                  A containerized operating system simulation for developers. Feature-rich, secure, and architected for extreme scale.
                </p>
                <div className="flex gap-12">
                   <Link href="/notes" className="text-xs font-heading font-bold tracking-widest uppercase border-b border-white/20 pb-2 hover:border-blue-500 transition-colors">
                      View Project
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </StickyCard>

        {/* FINAL CARD: THE PORTAL */}
        <section className="relative z-[50] h-screen bg-black flex flex-col items-center justify-center text-center space-y-16 px-6">
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 1 }}
           >
              <h2 className="font-heading text-4xl md:text-7xl font-black tracking-tighter">
                READY TO<br/>
                <span className="text-blue-500 italic">DEPLOY?</span>
              </h2>
              <div className="mt-20 flex flex-col md:flex-row justify-center gap-12 text-[10px] font-heading font-bold tracking-[0.4em] uppercase text-gray-500">
                 <a href="mailto:vpkpratham@gmail.com" className="hover:text-blue-500 transition-colors">vpkpratham@gmail.com</a>
                 <a href="https://linkedin.com/in/prathamvishwakarma" target="_blank" className="hover:text-blue-500 transition-colors">LinkedIn</a>
                 <a href="https://github.com/prathamvish333" target="_blank" className="hover:text-blue-500 transition-colors">GitHub</a>
              </div>
              <p className="mt-32 font-heading text-[10px] tracking-[1.5em] text-gray-800 uppercase">
                 Pratham Vishwakarma © 2026
              </p>
           </motion.div>
        </section>

      </main>
    </div>
  );
}
