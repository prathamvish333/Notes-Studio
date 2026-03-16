'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const containers = [
  { id: 'frontend', name: 'Web Runtime', port: 3000, color: 'text-blue-400', tier: 'WEB_LAYER' },
  { id: 'backend', name: 'API Engine', port: 8000, color: 'text-indigo-400', tier: 'LOGIC_LAYER' },
  { id: 'database', name: 'Data Storage', port: 5432, color: 'text-cyan-400', tier: 'DATA_LAYER' },
  { id: 'redis', name: 'Cache Layer', port: 6379, color: 'text-pink-400', tier: 'DATA_LAYER' },
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
      <div className="grid gap-4 md:gap-8 grid-cols-2 lg:grid-cols-4">
        {containers.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-[1.2rem] md:rounded-[2rem] border border-white/5 bg-white/[0.01] p-5 md:p-10 backdrop-blur-3xl transition-all hover:border-blue-500/30"
          >
            <div className="absolute top-0 right-0 p-3 md:p-6">
               <div className="h-1 w-1 md:h-2 md:w-2 rounded-full bg-blue-500 animate-pulse" />
            </div>

            <div className={`mb-4 md:mb-6 font-heading text-[7px] md:text-[9px] font-bold tracking-[0.3em] ${c.color} uppercase opacity-60`}>
              {c.tier}
            </div>
            
            <h3 className="font-heading text-lg md:text-2xl font-black text-white mb-1">{c.name}</h3>
            <p className="font-heading text-[8px] md:text-[10px] text-gray-600 mb-6 md:mb-10 tracking-[0.1em] font-medium opacity-50">TCP/{c.port}</p>

            <div className="space-y-4 md:space-y-8">
              {/* CPU Meter */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between items-center text-[7px] md:text-[9px] font-heading tracking-[0.1em] uppercase font-bold">
                  <span className="text-gray-500">Utilization</span>
                  <span className="text-blue-400">{stats[c.id]?.cpu || '0.2%'}</span>
                </div>
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    animate={{ width: stats[c.id]?.cpu || '20%' }}
                  />
                </div>
              </div>

              {/* Network Meter */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between items-center text-[7px] md:text-[9px] font-heading tracking-[0.1em] uppercase font-bold">
                  <span className="text-gray-500">Uptime</span>
                  <span className="text-indigo-400">99.9%</span>
                </div>
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-500/50"
                    animate={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-12 flex items-center justify-between">
              <span className="font-heading text-[7px] md:text-[9px] text-gray-700 tracking-[0.1em] font-bold uppercase">PROD_OK</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
