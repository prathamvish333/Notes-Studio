'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SystemStatus() {
  const [latency, setLatency] = useState(110);
  const [status, setStatus] = useState('Online');

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const jitter = Math.floor(Math.random() * 10) - 5;
        return Math.max(95, Math.min(145, prev + jitter));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 right-8 z-40 hidden lg:block"
    >
      <div className="bg-[#1e293b]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden group hover:border-[#0d9488]/30 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-ping absolute" />
            <div className="w-2 h-2 rounded-full bg-teal-500 relative" />
          </div>
          <span className="font-heading text-[10px] font-black uppercase tracking-[0.2em] text-[#e5e7eb]">System Status</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-8">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Notes API</span>
            <span className="font-mono text-[9px] text-teal-400 font-bold uppercase">● Online</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Latency</span>
            <span className="font-mono text-[9px] text-teal-500 font-bold uppercase tracking-tighter">{latency}ms</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Environment</span>
            <span className="font-mono text-[9px] text-[#e5e7eb] font-bold uppercase">Production</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Last Deploy</span>
            <span className="font-mono text-[9px] text-gray-300 font-bold uppercase underline decoration-teal-500/30">2 Days Ago</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/[0.03] space-y-3">
          <div className="flex justify-between items-center text-[8px] font-mono text-gray-600 uppercase tracking-widest">
            <span>Uptime 99.9%</span>
            <span>v4.2.1-stable</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: [-100, 200] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="h-full w-24 bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
