'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const DEVOPS_LOGS = [
  { type: 'info', text: 'Initializing portfolio-cli v3.6.0...' },
  { type: 'success', text: 'Connection established to production-cluster-jio.' },
  { type: 'process', text: 'Fetching architecture state for "Engineering Dashboard"...' },
  { type: 'info', text: 'STATUS: SCALE_OPTIMIZED | NODES: 12' },
  { type: 'process', text: 'Validating IAM policies & Security Contexts...' },
  { type: 'success', text: 'Security Audit: ALL_SYSTEMS_GO.' },
  { type: 'info', text: 'Automated CI/CD: 1,240 Successful runs in last 30d.' },
  { type: 'process', text: 'Profiling backend latency (FastAPI)...' },
  { type: 'info', text: 'P99: 14ms | QPS_CAPACITY: 50k+' },
  { type: 'warning', text: 'Regional traffic spike detected - scaling AWS ASG...' },
  { type: 'success', text: 'Horizontal scaling complete. Load balanced.' },
];

export default function TerminalSection() {
  const [logs, setLogs] = useState<typeof DEVOPS_LOGS>([]);
  const [isMounted, setIsMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const logIndexRef = useRef(0);

  useEffect(() => {
    setIsMounted(true);

    const updateStats = () => {
      if (logIndexRef.current < DEVOPS_LOGS.length) {
        setLogs(prev => [...prev, DEVOPS_LOGS[logIndexRef.current]]);
        logIndexRef.current++;
      } else {
        clearInterval(interval);
      }
    };

    updateStats();
    const interval = setInterval(updateStats, 1200);

    return () => clearInterval(interval);
  }, [isMounted]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isMounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      {/* Dynamic Glow */}
      <div className="absolute -top-24 -left-24 h-48 w-48 bg-emerald-500/10 blur-[80px]" />
      
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/40" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/40" />
          </div>
          <div className="ml-2 font-mono text-[10px] text-gray-400 tracking-wider">
            bash — <span className="text-emerald-400">system_monitor.sh</span>
          </div>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="h-[380px] overflow-y-auto p-8 font-mono text-[11px] leading-relaxed custom-scrollbar selection:bg-emerald-500/40"
      >
        {logs.map((log, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-3 flex gap-4"
          >
            <span className="shrink-0 text-gray-600 font-light">
              [{new Date().toLocaleTimeString([], { hour12: false })}]
            </span>
            <span className={
              log?.type === 'success' ? 'text-emerald-400' :
              log?.type === 'warning' ? 'text-amber-400' :
              log?.type === 'process' ? 'text-cyan-400' :
              'text-white/70'
            }>
              {log?.type === 'process' && <span className="inline-block animate-spin mr-2">⟳</span>}
              {log?.type === 'success' && <span className="mr-2">✓</span>}
              {log?.type === 'warning' && <span className="mr-2">!</span>}
              {log?.text}
            </span>
          </motion.div>
        ))}
        
        <div className="mt-6 flex items-center gap-2">
          <span className="text-emerald-500 font-bold">➜</span>
          <span className="text-cyan-400/80 italic">~/pratham/showcase</span>
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="h-3.5 w-1.5 bg-emerald-400"
          />
        </div>
      </div>

      {/* Futuristic Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] opacity-20" />
    </motion.div>
  );
}
