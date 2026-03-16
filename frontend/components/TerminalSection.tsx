'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const DEVOPS_LOGS = [
  { type: 'info', text: '[SYSTEM] Initializing portfolio-cli v3.9.0-CINEMATIC...' },
  { type: 'success', text: '[NETWORK] VPC Tunnel established to GCP.35.235.249.250' },
  { type: 'process', text: '[K8S] Fetching regional cluster state "CloudXP-Core"...' },
  { type: 'info', text: '[K8S] NODES: 24 | REPLICAS: 48 | STATUS: OPTIMIZED' },
  { type: 'process', text: '[AUTH] Validating RSA keys & Security Contexts...' },
  { type: 'success', text: '[AUTH] Identity verified: admin@pratham.engineering' },
  { type: 'info', text: '[CI/CD] Automated Deployment pipeline: READY' },
  { type: 'process', text: '[CACHE] Warming L2 Redis clusters (Region: us-west-2)...' },
  { type: 'success', text: '[CACHE] 1.2TB Data warmed. Latency: 0.8ms' },
  { type: 'info', text: '[APP] P99 Latency: 12ms | Resilience: 99.99%' },
  { type: 'warning', text: '[TRAFFIC] Geo-spike detected: redirecting via Cloudflare...' },
  { type: 'success', text: '[LOAD_BALANCER] Traffic shifted. Cluster stable.' },
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
        // Loop logs for cinematic effect
        logIndexRef.current = 0;
        setLogs([]);
      }
    };

    updateStats();
    const interval = setInterval(updateStats, 1500);

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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="relative w-full rounded-[2.5rem] border border-white/5 bg-white/[0.01] backdrop-blur-[60px] shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-10 py-6">
        <div className="flex items-center gap-8">
          <div className="flex gap-2.5">
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <div className="font-heading text-[10px] text-gray-400 tracking-[0.4em] uppercase font-bold">
            Console_01 // SYSTEM_RUNTIME
          </div>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="h-[480px] overflow-y-auto p-12 font-mono text-[11px] leading-relaxed scrollbar-hide selection:bg-blue-500/20"
      >
        {logs.map((log, idx) => (
          <motion.div 
            key={`${idx}-${logIndexRef.current}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 flex gap-8"
          >
            <span className="shrink-0 text-gray-700 font-light opacity-60">
              [{new Date().toLocaleTimeString([], { hour12: false, second: '2-digit' })}]
            </span>
            <span className={
              log?.type === 'success' ? 'text-blue-400' :
              log?.type === 'warning' ? 'text-indigo-400' :
              log?.type === 'process' ? 'text-gray-400' :
              'text-white/30'
            }>
              {log?.text}
            </span>
          </motion.div>
        ))}
        
        <div className="mt-12 flex items-center gap-4">
          <span className="text-blue-500 font-bold tracking-tighter">❯</span>
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="h-4 w-1 bg-blue-500/50"
          />
        </div>
      </div>
    </motion.div>
  );
}
