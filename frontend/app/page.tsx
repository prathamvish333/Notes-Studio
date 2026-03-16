'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import TerminalSection from '@/components/TerminalSection';
import InfraStatus from '@/components/InfraStatus';

function StickyCard({ children, index, zIndex, title }: { children: React.ReactNode; index: number; zIndex: number; title?: string }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const translateY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="sticky-section" style={{ zIndex }}>
      <motion.div 
        style={{ translateY, scale, opacity }}
        className="relative h-full w-full bg-black flex flex-col justify-center px-6 md:px-20 lg:px-32 py-20"
      >
        {title && (
          <div className="absolute top-12 md:top-24 left-6 md:left-20 lg:left-32 z-20">
            <span className="font-heading text-[10px] md:text-[12px] text-blue-500 font-bold tracking-[0.4em] uppercase opacity-60">
              PRATHAM // {title}
            </span>
          </div>
        )}
        <div className="relative z-10 w-full h-full flex flex-col justify-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className="relative bg-black text-white selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      {/* SECTION 01: HERO */}
      <section className="relative h-screen w-full flex flex-col justify-center px-6 md:px-20 lg:px-32 z-10">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-black to-black" />
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 3 }}
            src="file:///Users/pratham/.gemini/antigravity/brain/e4b00bc3-e9d1-4cd5-80ae-8c4bd1ce0513/breathtaking_architecture_abstract_1773665753495.png" 
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </div>

        <div className="relative z-10 flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="kinetic-text kinetic-text-outline">
              Pratham<span className="text-blue-500/30">.</span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="mt-[-1vw] md:mt-[-4vw]"
          >
            <h1 className="kinetic-text text-white">
              Vishwakarma
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-center gap-8 md:gap-16"
          >
            <div className="max-w-md">
              <p className="font-heading text-xs md:text-sm text-gray-400 leading-relaxed tracking-widest uppercase font-medium">
                Infrastructure Architect & DevOps specialist. <br />
                Scaling distributed systems for the next web.
              </p>
            </div>
            <div className="flex gap-8">
              <Link href="/desktop" className="group flex items-center gap-4 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
                <span className="text-blue-500">→</span>
                <span className="border-b border-white/20 pb-1 transition-all group-hover:border-blue-500">Launch_OS</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 02: EXPERIENCE */}
      <StickyCard index={1} zIndex={20} title="CAREER_HISTORY">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center h-full">
          <div className="space-y-8 md:space-y-12">
            <div>
              <h2 className="font-heading text-4xl md:text-7xl lg:text-9xl font-black text-white leading-none tracking-tighter">
                Jio<br/>Platforms<span className="text-blue-500">.</span>
              </h2>
              <p className="mt-4 md:mt-8 font-heading text-[10px] md:text-[12px] text-gray-400 tracking-[0.4em] uppercase font-bold">
                Backend & DevOps Engineer // 2023 — PRESENT
              </p>
            </div>
            <p className="text-sm md:text-xl text-gray-500 leading-relaxed max-w-xl font-medium">
              Architecting high-throughput microservices and orchestrating multi-region Kubernetes clusters for India's largest infrastructure.
            </p>
          </div>
          <div className="hidden lg:block relative p-12">
            <img 
              src="file:///Users/pratham/.gemini/antigravity/brain/e4b00bc3-e9d1-4cd5-80ae-8c4bd1ce0513/devops_blueprint_isometric_1773665771110.png" 
              className="w-full h-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000" 
              alt="Systems Architecture"
            />
          </div>
        </div>
      </StickyCard>

      {/* SECTION 03: TELEMETRY */}
      <StickyCard index={2} zIndex={30} title="LIVE_MONITOR">
        <div className="space-y-12 md:space-y-20 h-full flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-heading text-4xl md:text-6xl lg:text-8xl font-black text-white leading-tight tracking-tighter">
              System<br />
              <span className="text-blue-500">Telemetry.</span>
            </h2>
            <div className="text-left md:text-right">
              <p className="text-[10px] md:text-[12px] text-gray-600 font-heading tracking-[0.3em] uppercase font-bold">
                CLUSTER_HEALTH: 100%
              </p>
            </div>
          </div>
          <InfraStatus />
        </div>
      </StickyCard>

      {/* SECTION 04: PROJECT */}
      <StickyCard index={3} zIndex={40} title="FLAGSHIP_PROJECT">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center h-full">
          <div className="order-2 lg:order-1">
             <TerminalSection />
          </div>
          <div className="order-1 lg:order-2 space-y-8 md:space-y-12">
            <h2 className="font-heading text-4xl md:text-7xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter">
              Notes<br />Studio<span className="text-indigo-500">.</span>
            </h2>
            <p className="text-sm md:text-lg text-gray-500 leading-relaxed font-medium max-w-xl">
              A full-stack engineered AI collaborative platform. Built with security-first architecture and sub-millisecond sync.
            </p>
            <Link href="https://github.com/prathamvish333/Notes-Studio" className="inline-flex items-center gap-6 group">
              <span className="text-[10px] md:text-xs font-black tracking-[0.5em] uppercase text-white group-hover:text-blue-500 transition-colors">EXPLORE_SOURCE</span>
              <div className="h-0.5 w-12 bg-white/20 group-hover:w-20 group-hover:bg-blue-500 transition-all duration-500" />
            </Link>
          </div>
        </div>
      </StickyCard>

      <footer className="relative z-50 bg-black border-t border-white/5 py-12 md:py-24 px-6 md:px-20 lg:px-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div>
            <h3 className="font-heading text-xl md:text-3xl font-black text-white mb-2">P.V.</h3>
            <p className="text-[10px] text-gray-800 font-heading tracking-[0.5em] uppercase font-bold">Infrastructure Architect // 2026</p>
          </div>
          <div className="flex gap-12 font-heading text-[10px] font-bold tracking-[0.4em] uppercase text-gray-600">
            <Link href="https://github.com/prathamvish333" className="hover:text-white transition-colors">GITHUB</Link>
            <Link href="https://linkedin.com/in/prathamvishwakarma" className="hover:text-white transition-colors">LINKEDIN</Link>
            <Link href="mailto:vpkpratham@gmail.com" className="hover:text-white transition-colors">EMAIL</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
