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
      className="relative w-full rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-8 py-5">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
          <div className="font-heading text-[10px] text-gray-500 tracking-[0.3em] uppercase">
            system_monitor.sh
          </div>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="h-[420px] overflow-y-auto p-10 font-mono text-[10px] leading-relaxed scrollbar-hide selection:bg-blue-500/20"
      >
        {logs.map((log, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4 flex gap-6"
          >
            <span className="shrink-0 text-gray-700 font-light">
              [{new Date().toLocaleTimeString([], { hour12: false, second: '2-digit' })}]
            </span>
            <span className={
              log?.type === 'success' ? 'text-blue-400' :
              log?.type === 'warning' ? 'text-indigo-400' :
              log?.type === 'process' ? 'text-gray-400' :
              'text-white/40'
            }>
              {log?.text}
            </span>
          </motion.div>
        ))}
        
        <div className="mt-8 flex items-center gap-4">
          <span className="text-blue-500 font-bold tracking-tighter">❯</span>
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="h-3 w-1 bg-blue-500/50"
          />
        </div>
      </div>
    </motion.div>
  );
}
