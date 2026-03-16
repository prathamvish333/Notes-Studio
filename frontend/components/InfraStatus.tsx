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
    <div className="w-full">
      <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
        {containers.map((c, i) => (
          <motion.div
            key={c.id}
            whileHover={{ y: -8, scale: 1.05 }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.01] p-10 backdrop-blur-3xl transition-all hover:border-blue-500/20 hover:bg-white/[0.03]"
          >
            <div className={`mb-8 font-heading text-[10px] font-medium tracking-[0.3em] ${c.color} uppercase opacity-60`}>
              Cluster_0{i+1}
            </div>
            
            <h3 className="font-heading text-2xl font-bold text-white mb-2">{c.name}.</h3>
            <p className="font-heading text-[10px] text-gray-600 mb-10 tracking-[0.2em]">PORT_{c.port}</p>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-heading tracking-widest uppercase">
                  <span className="text-gray-600">Load</span>
                  <span className="text-blue-400">{stats[c.id]?.cpu || '0.0%'}</span>
                </div>
                <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    animate={{ width: stats[c.id]?.cpu || '0%' }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-heading tracking-widest uppercase">
                  <span className="text-gray-600">Memory</span>
                  <span className="text-indigo-400">{stats[c.id]?.mem || '0MB'}</span>
                </div>
                <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                    animate={{ width: '42%' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="font-heading text-[10px] text-blue-400 tracking-widest uppercase">Standby.</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
