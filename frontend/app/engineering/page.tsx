'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const articles = [
  {
    title: 'Designing JWT Authentication with FastAPI',
    date: '2025-02-15',
    tags: ['FastAPI', 'JWT', 'Security', 'Python'],
    summary: 'A comprehensive guide to implementing stateless, secure authentication using JSON Web Tokens. Covers password hashing with bcrypt, token lifecycle management, and middleware integration for route protection.',
    readTime: '8 min read',
  },
  {
    title: 'Containerizing Python APIs with Docker',
    date: '2025-01-20',
    tags: ['Docker', 'DevOps', 'Python', 'Microservices'],
    summary: 'Best practices for creating efficient, production-ready Docker images for Python applications. Explores multi-stage builds, non-root user security, and managing dependencies with poetry or pip.',
    readTime: '6 min read',
  },
  {
    title: 'Deploying Backend Services with Kubernetes',
    date: '2024-12-10',
    tags: ['Kubernetes', 'K8s', 'Orchestration', 'Scaling'],
    summary: 'Scaling distributed backend services on Kubernetes. Walkthrough of defining deployment manifests, service discovery, persistent volumes, and health monitoring via Prometheus.',
    readTime: '12 min read',
  },
];

export default function EngineeringPage() {
  const [showSoon, setShowSoon] = useState(false);

  return (
    <main className="min-h-screen bg-[#0b1120] text-[#e5e7eb] overflow-x-hidden selection:bg-teal-500/30">
      {/* Coming Soon Alert */}
      {showSoon && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-3rem)] max-w-sm"
        >
          <div className="bg-[#111827] border border-teal-500/30 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500">
                🚀
              </div>
              <div>
                <p className="text-xs font-heading font-black text-white uppercase tracking-widest">Incoming Insight</p>
                <p className="text-[10px] text-gray-500 font-medium">This article is currently being polished.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowSoon(false)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link href="/" className="group flex items-center gap-2 font-heading text-xs font-bold text-[#0d9488] uppercase tracking-widest transition-all hover:text-[#e5e7eb]">
            <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
            Back to Command Center
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-[#0d9488]" />
            <span className="font-heading text-xs font-black text-[#0d9488] uppercase tracking-[0.3em]">Knowledge Base</span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            Engineering<br />
            <span className="text-gray-700">Insights</span>
          </h1>
          <p className="mt-8 text-lg text-gray-400 leading-relaxed max-w-2xl">
            Technical write-ups on high-availability architecture, cloud-native deployments, and backend engineering decisions.
          </p>
        </motion.div>

        {/* Article Grid */}
        <div className="grid gap-8">
          {articles.map((article, i) => (
            <motion.article 
              key={article.title} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-12 transition-all hover:border-teal-500/20 hover:bg-teal-500/[0.02] overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-teal-500/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <time className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{article.date}</time>
                  <span className="text-gray-700">•</span>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{article.readTime}</span>
                  <div className="flex gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="skill-badge text-[9px] py-1 px-3 bg-[#0d9488]/5 border-[#0d9488]/10 text-[#0d9488]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="font-heading text-2xl md:text-3xl font-black text-[#e5e7eb] mb-4 group-hover:text-[#0d9488] transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-gray-400 leading-relaxed md:text-lg max-w-3xl">
                  {article.summary}
                </p>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <button 
                    onClick={() => {
                      setShowSoon(true);
                      setTimeout(() => setShowSoon(false), 3000);
                    }}
                    className="px-6 py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 font-heading text-[10px] font-black tracking-widest uppercase hover:bg-teal-500 hover:text-white transition-all"
                  >
                    Read Article
                  </button>
                  <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                    Available Now
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
          {articles.length === 0 && (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
              <p className="font-heading text-gray-500 uppercase tracking-widest text-sm">Engineering articles coming soon.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 pt-12 border-t border-white/5 text-center"
        >
          <p className="font-heading text-[10px] text-gray-600 uppercase tracking-[0.4em] font-bold">
            Systems & Infrastructure Logs • Updated Weekly
          </p>
        </motion.div>
      </div>
    </main>
  );
}
