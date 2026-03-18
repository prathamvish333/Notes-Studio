'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const containers = [
  { id: 'frontend', name: 'Frontend', port: 3000, color: 'text-[#2dd4bf]', tier: 'WEB_LAYER' },
  { id: 'backend', name: 'Backend API', port: 8000, color: 'text-[#0d9488]', tier: 'LOGIC_LAYER' },
  { id: 'database', name: 'Database', port: 5432, color: 'text-[#14b8a6]', tier: 'DATA_LAYER' },
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
      <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-3">
        {containers.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm transition-all hover:border-teal-500/20"
          >
            <div className="absolute top-4 right-4">
               <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className={`mb-4 font-heading text-[9px] font-bold tracking-[0.3em] ${c.color} uppercase opacity-60`}>
              {c.tier}
            </div>

            <h3 className="font-heading text-lg md:text-xl font-black text-white mb-1">{c.name}</h3>
            <p className="font-heading text-[10px] text-gray-600 mb-6 tracking-wider font-medium">TCP/{c.port}</p>

            <div className="space-y-4">
              {/* CPU Meter */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-heading tracking-wider uppercase font-bold">
                  <span className="text-gray-500">CPU</span>
                  <span className="text-teal-400">{stats[c.id]?.cpu || '0.2%'}</span>
                </div>
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal-500/60"
                    animate={{ width: stats[c.id]?.cpu || '20%' }}
                  />
                </div>
              </div>

              {/* Memory */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-heading tracking-wider uppercase font-bold">
                  <span className="text-gray-500">Memory</span>
                  <span className="text-teal-500">{stats[c.id]?.mem || '140MB'}</span>
                </div>
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal-600/60"
                    animate={{ width: '45%' }}
                  />
                </div>
              </div>

              {/* Latency */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-heading tracking-wider uppercase font-bold">
                  <span className="text-gray-500">Latency</span>
                  <span className="text-teal-400">{stats[c.id]?.net || '2ms'}</span>
                </div>
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal-500/60"
                    animate={{ width: '15%' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-heading text-[9px] text-[#2dd4bf]/60 tracking-wider font-bold uppercase">● Online</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
