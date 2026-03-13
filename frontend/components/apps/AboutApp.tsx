'use client';

import { motion } from 'framer-motion';

export default function AboutApp() {
    return (
        <div className="flex h-full w-full flex-col p-6 sm:p-10 bg-black/50 overflow-y-auto custom-scrollbar">
            <div className="mb-8 flex items-end justify-between border-b border-terminal-green/30 pb-4">
                <div>
                    <h1 className="font-mono text-xl sm:text-3xl font-bold text-terminal-green">~/about_pc</h1>
                    <p className="mt-1 font-mono text-[10px] sm:text-xs text-terminal-muted lowercase tracking-tighter">System Details & Maintainer Info</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 pb-10">
                {/* Logo / Graphic Side */}
                <div className="flex flex-col items-center justify-center p-8 border border-terminal-dim bg-terminal-board/40 rounded-lg min-w-[250px]">
                    <div className="text-8xl mb-4 text-terminal-cyan animate-pulse">🖥️</div>
                    <h2 className="font-mono text-xl font-bold text-terminal-green uppercase tracking-widest">Pratham's OS</h2>
                    <p className="font-mono text-[10px] text-gray-500 mt-2 uppercase">v3.0.0 (Stable)</p>
                    <div className="mt-4 px-3 py-1 bg-terminal-green/10 text-terminal-green text-[10px] rounded border border-terminal-green/30 cursor-default font-bold tracking-widest">
                        STATUS: OPTIMIZED
                    </div>
                </div>

                {/* Info Side */}
                <div className="flex flex-col gap-6 w-full">

                    {/* Maintainer Info */}
                    <div className="border border-terminal-dim bg-terminal-board/40 p-6 rounded-lg shadow-inner">
                        <h3 className="font-mono text-sm sm:text-lg text-terminal-green mb-4 border-b border-terminal-dim pb-2 uppercase tracking-widest font-bold">// DEVELOPER_INFO</h3>
                        <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-2 font-mono text-[11px] sm:text-sm">
                            <span className="text-gray-500 uppercase">Name:</span>
                            <span className="text-gray-200">Pratham Vishwakarma</span>

                            <span className="text-gray-500 uppercase">Role:</span>
                            <span className="text-gray-200">Backend and DevOps Engineer</span>

                            <span className="text-gray-500 uppercase">Links:</span>
                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                <a href="https://github.com/prathamvish333" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30">GitHub</a>
                                <span className="text-terminal-muted hidden sm:inline">•</span>
                                <a href="https://www.linkedin.com/in/prathamvishwakarma" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30">LinkedIn</a>
                                <span className="text-terminal-muted hidden sm:inline">•</span>
                                <a href="mailto:prathamvishwakarma2000@gmail.com" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30">Email</a>
                            </div>
                        </div>
                    </div>

                    {/* Tech Specs */}
                    <div className="border border-terminal-dim bg-terminal-board/40 p-6 rounded-lg shadow-inner">
                        <h3 className="font-mono text-sm sm:text-lg text-terminal-green mb-4 border-b border-terminal-dim pb-2 uppercase tracking-widest font-bold">// SYSTEM_SPECS</h3>
                        <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-y-3 font-mono text-[11px] sm:text-sm">
                            <span className="text-gray-500 uppercase">Architecture:</span>
                            <span className="text-gray-200">3-Tier Containerized Microservices</span>

                            <span className="text-gray-500 uppercase">Frontend:</span>
                            <span className="text-gray-200">Next.js 14, React, TailwindCSS, Framer Motion</span>

                            <span className="text-gray-500 uppercase">Backend:</span>
                            <span className="text-gray-200">FastAPI, Python 3.11, SQLAlchemy</span>

                            <span className="text-gray-500 uppercase">Database:</span>
                            <span className="text-gray-200">PostgreSQL (ACID-compliant)</span>

                            <span className="text-gray-500 uppercase">Ops:</span>
                            <span className="text-gray-200">Docker, Kubernetes, Jenkins, Grafana</span>
                        </div>
                    </div>

                    <div className="text-[10px] font-mono text-gray-600 text-center mt-4 uppercase tracking-tighter opacity-50">
                        Pratham's OS is a specialized interface designed for high-performance portfolio management and CI/CD monitoring.
                    </div>
                </div>
            </div>
        </div>
    );
}
