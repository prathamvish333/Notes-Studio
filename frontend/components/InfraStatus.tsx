'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const containers = [
  { id: 'fe', name: 'Frontend', port: '80', color: 'text-cyan-400', glow: 'bg-cyan-500/10' },
  { id: 'be', name: 'Backend', port: '8000', color: 'text-emerald-400', glow: 'bg-emerald-500/10' },
  { id: 'db', name: 'Postgres', port: '5432', color: 'text-indigo-400', glow: 'bg-indigo-500/10' },
  { id: 'rv', name: 'Redis', port: '6379', color: 'text-rose-400', glow: 'bg-rose-500/10' },
];

export default function InfraStatus() {
  const [stats, setStats] = useState<Record<string, { cpu: string; mem: string; status: string }>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateStats = () => {
      const newStats: any = {};
      containers.forEach(c => {
        newStats[c.id] = {
          cpu: (Math.random() * 5 + 0.5).toFixed(1) + '%',
          mem: (Math.random() * 50 + 120).toFixed(0) + 'MB',
          status: 'RUNNING'
        };
      });
      setStats(newStats);
    };

    updateStats();
    const interval = setInterval(updateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {containers.map((c, i) => (
          <motion.div
            key={c.id}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all hover:border-emerald-500/30 hover:bg-white/[0.06] shadow-2xl"
          >
            {/* Intensity Glow */}
            <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${c.glow} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className={`mb-6 font-mono text-[9px] font-bold tracking-[0.2em] ${c.color} uppercase`}>
              {c.id} // CLUSTER_PROD_0{i+1}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{c.name}</h3>
            <p className="font-mono text-[10px] text-gray-500 mb-8 font-light tracking-widest">PORT_{c.port}</p>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-tight">
                  <span className="text-gray-500 uppercase italic">CPU_USAGE_LOAD</span>
                  <span className="text-emerald-400 font-bold">{stats[c.id]?.cpu || '0.0%'}</span>
                </div>
                <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    animate={{ width: stats[c.id]?.cpu || '0%' }}
                    transition={{ type: "spring", stiffness: 50 }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-tight">
                  <span className="text-gray-500 uppercase italic">MEM_VIRT_RSS</span>
                  <span className="text-cyan-400 font-bold">{stats[c.id]?.mem || '0MB'}</span>
                </div>
                <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    animate={{ width: '42%' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-5">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] text-emerald-400 font-medium tracking-widest">NODE_UP</span>
              </div>
              <span className="font-mono text-[9px] text-gray-600 font-light italic">SLO: 99.99%</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 flex justify-center">
        <div className="px-6 py-3 rounded-full border border-emerald-500/10 bg-emerald-500/[0.02] backdrop-blur-md">
           <p className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.5em] text-center">
             Global Cluster Mesh: <span className="text-emerald-400/80">jio-west-node-active</span> · Entropy: <span className="text-white">Stable</span>
           </p>
        </div>
      </div>
    </div>
  );
}
