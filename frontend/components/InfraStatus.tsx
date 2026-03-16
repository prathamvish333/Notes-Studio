'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const containers = [
  { id: 'fe', name: 'Frontend', port: '443', color: 'text-blue-400', glow: 'bg-blue-500/20' },
  { id: 'be', name: 'Backend', port: '8000', color: 'text-indigo-400', glow: 'bg-indigo-500/20' },
  { id: 'db', name: 'Postgres', port: '5432', color: 'text-blue-600', glow: 'bg-blue-600/20' },
  { id: 'rv', name: 'Redis', port: '6379', color: 'text-sky-400', glow: 'bg-sky-500/20' },
];

export default function InfraStatus() {
  const [stats, setStats] = useState<Record<string, { cpu: string; mem: string; net: string }>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateStats = () => {
      const newStats: any = {};
      containers.forEach(c => {
        newStats[c.id] = {
          cpu: (Math.random() * 3 + 0.2).toFixed(1) + '%',
          mem: (Math.random() * 20 + 140).toFixed(0) + 'MB',
          net: (Math.random() * 10 + 2).toFixed(1) + 'ms'
        };
      });
      setStats(newStats);
    };

    updateStats();
    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {containers.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-12 backdrop-blur-3xl transition-all hover:border-blue-500/30"
          >
            <div className="absolute top-0 right-0 p-8">
               <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            </div>

            <div className={`mb-10 font-heading text-[10px] font-bold tracking-[0.4em] ${c.color} uppercase opacity-40`}>
              CLUSTER_NODE_0{i+1}
            </div>
            
            <h3 className="font-heading text-3xl font-black text-white mb-2">{c.name}</h3>
            <p className="font-heading text-[11px] text-gray-600 mb-12 tracking-[0.3em] font-medium">ADDR::TCP/{c.port}</p>

            <div className="space-y-10">
              {/* CPU Meter */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-heading tracking-[0.2em] uppercase font-bold">
                  <span className="text-gray-500">Core_Load</span>
                  <span className="text-blue-400">{stats[c.id]?.cpu || '0.0%'}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    animate={{ width: stats[c.id]?.cpu || '0%' }}
                    transition={{ type: "spring", stiffness: 30 }}
                  />
                </div>
              </div>

              {/* Network Meter */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-heading tracking-[0.2em] uppercase font-bold">
                  <span className="text-gray-500">Latency</span>
                  <span className="text-indigo-400">{stats[c.id]?.net || '0ms'}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                    animate={{ width: '35%' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 flex items-center justify-between">
              <span className="font-heading text-[10px] text-gray-700 tracking-[0.2em] font-bold uppercase">Health: 100%</span>
              <div className="flex gap-1">
                 {[1,2,3,4].map(dot => (
                   <div key={dot} className="h-1 w-3 rounded-full bg-blue-500/20" />
                 ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
