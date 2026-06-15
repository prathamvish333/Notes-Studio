'use client';

import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FloatingAIAgent() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={() => router.push('/devops')}
        className="group relative flex items-center justify-center w-16 h-16 md:w-[200px] md:h-16 bg-[#0b1120] border border-teal-500/50 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] hover:border-teal-400 transition-all overflow-hidden"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-teal-500/5 group-hover:bg-transparent transition-colors" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative">
            <Bot className="w-6 h-6 text-teal-400 group-hover:text-teal-300" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute -inset-2 border border-teal-500/30 rounded-full border-t-transparent border-l-transparent"
            />
            <Sparkles className="absolute -top-1 -right-2 w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <span className="hidden md:block font-heading text-xs font-black tracking-widest uppercase text-teal-300 group-hover:text-teal-200">
            Ask AI Agent
          </span>
        </div>
      </motion.button>
    </div>
  );
}
