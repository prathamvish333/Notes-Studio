'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const containers = [
  { id: 'fe', name: 'Frontend (Next.js)', port: '3000', color: 'text-cyan-400' },
  { id: 'be', name: 'Backend (FastAPI)', port: '8000', color: 'text-emerald-400' },
  { id: 'db', name: 'Database (PostgreSQL)', port: '5432', color: 'text-indigo-400' },
  { id: 'rv', name: 'Redis (Cache)', port: '6379', color: 'text-rose-400' },
];

export default function InfraStatus() {
  const [stats, setStats] = useState<Record<string, { cpu: string; mem: string; status: string }>>({});

  useEffect(() => {
    const updateStats = () => {
      const newStats: any = {};
      containers.forEach(c => {
        newStats[c.id] = {
          cpu: (Math.random() * 5 + 0.5).toFixed(1) + '%',
          mem: (Math.random() * 50 + 120).toFixed(0) + 'MB',
          status: 'RUNNING',
          uptime: '2d 4h 12m'
        };
      });
      setStats(newStats);
    };

    updateStats();
    const interval = setInterval(updateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
        <h2 className="font-mono text-xs tracking-[0.4em] text-emerald-400/60 uppercase">
          Live Infrastructure Status
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {containers.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-emerald-500/20 hover:bg-white/[0.04]"
          >
            <div className={`mb-4 font-mono text-[10px] font-bold tracking-tighter hover:scale-105 transition-transform ${c.color}`}>
              {c.id.toUpperCase()} // CLUSTER_NODE_0{i+1}
            </div>
            
            <h3 className="text-sm font-medium text-white/90 mb-1">{c.name}</h3>
            <p className="font-mono text-[10px] text-gray-500 mb-6">PORT: {c.port}</p>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-gray-500">CPU</span>
                <span className="text-gray-300">{stats[c.id]?.cpu || '0.0%'}</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-emerald-500/40"
                  animate={{ width: stats[c.id]?.cpu || '0%' }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-gray-500">MEMORY</span>
                <span className="text-gray-300">{stats[c.id]?.mem || '0MB'}</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500/40"
                  animate={{ width: '45%' }}
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="font-mono text-[9px] text-emerald-500/80">HEALTHY</span>
              </div>
              <span className="font-mono text-[9px] text-gray-600">UP: 99.9%</span>
            </div>

            {/* Subtle glow on hover */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
          Kubernetes Cluster: nodes-app (us-west-2) · Status: ⚡ STABLE
        </p>
      </div>
    </div>
  );
}
