'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const DEVOPS_LOGS = [
  { type: 'info', text: 'Initializing portfolio-cli v3.0.0...' },
  { type: 'success', text: 'Connection established to pratham-k8s-cluster.' },
  { type: 'process', text: 'Fetching deployment status for "notes-frontend"...' },
  { type: 'info', text: 'STATUS: RUNNING | REPLICAS: 3/3' },
  { type: 'process', text: 'Checking CI/CD pipeline health...' },
  { type: 'success', text: 'Jenkins Pipeline [JOB_ID: 942] PASSED.' },
  { type: 'info', text: 'Last deploy: 4 minutes ago by pratham-bot.' },
  { type: 'process', text: 'Querying database metrics...' },
  { type: 'info', text: 'PG_ACTIVE_CONNECTIONS: 24 | LATENCY: 12ms' },
  { type: 'warning', text: 'Cache hit rate at 88% - optimizing Redis eviction policy.' },
  { type: 'success', text: 'Environment stable. Multi-zone sync complete.' },
];

export default function TerminalSection() {
  const [logs, setLogs] = useState<typeof DEVOPS_LOGS>([]);
  const [input, setInput] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const logIndexRef = useRef(0); // To keep track of the current log index

  useEffect(() => {
    setIsMounted(true);

    const updateStats = () => {
      if (logIndexRef.current < DEVOPS_LOGS.length) {
        setLogs(prev => [...prev, DEVOPS_LOGS[logIndexRef.current]]);
        logIndexRef.current++;
      } else {
        clearInterval(interval); // Clear interval once all logs are displayed
      }
    };

    // Call once immediately to show the first log
    updateStats();
    const interval = setInterval(updateStats, 800);

    return () => clearInterval(interval);
  }, [isMounted]); // Dependency array changed to [isMounted]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isMounted) return null; // Mount guard

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        <h2 className="font-mono text-xs tracking-[0.4em] text-cyan-400/60 uppercase">
          UI CLI // Interactive Logs
        </h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative group rounded-xl border border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-3">
          <div className="flex gap-1.5 font-mono text-[9px] text-gray-500">
            <span className="text-emerald-500">USER</span>: pratham
            <span className="mx-2">|</span>
            <span className="text-cyan-500">HOST</span>: production-vm
          </div>
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          className="h-[320px] overflow-y-auto p-6 font-mono text-[11px] leading-relaxed custom-scrollbar"
        >
          {logs.map((log, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2 flex gap-3"
            >
              <span className="shrink-0 text-gray-700">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
              <span className={
                log?.type === 'success' ? 'text-emerald-400' :
                log?.type === 'warning' ? 'text-amber-400' :
                log?.type === 'process' ? 'text-cyan-400' :
                'text-gray-400'
              }>
                {log?.type === 'process' && '⟳ '}
                {log?.type === 'success' && '✓ '}
                {log?.type === 'warning' && '⚠ '}
                {log?.text}
              </span>
            </motion.div>
          ))}
          
          <div className="mt-4 flex items-center gap-2">
            <span className="text-emerald-500">➜</span>
            <span className="text-cyan-400">~/projects/portfolio</span>
            <span className="text-white animate-pulse">_</span>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute bottom-0 right-0 h-24 w-24 bg-gradient-to-tl from-emerald-500/5 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
