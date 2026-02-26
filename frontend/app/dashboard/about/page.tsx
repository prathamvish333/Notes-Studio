'use client';

import { motion } from 'framer-motion';

export default function AboutSystem() {
    return (
        <div className="flex h-[calc(100vh-100px)] w-full flex-col">
            <div className="mb-8 flex items-end justify-between border-b border-terminal-green/30 pb-4">
                <div>
                    <h1 className="font-mono text-3xl font-bold text-terminal-green">~/about_pc</h1>
                    <p className="mt-1 font-mono text-xs text-terminal-muted">System Details & Maintainer Info</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row gap-8 overflow-y-auto pb-10 custom-scrollbar"
            >
                {/* Logo / Graphic Side */}
                <div className="flex flex-col items-center justify-center p-8 border border-terminal-dim bg-terminal-board/40 rounded-lg min-w-[250px]">
                    <div className="text-8xl mb-4 text-terminal-cyan animate-pulse">🖥️</div>
                    <h2 className="font-mono text-xl font-bold text-terminal-green">Pratham_OS</h2>
                    <p className="font-mono text-xs text-gray-500 mt-2">v 1.0.0 (Build 8904)</p>
                    <div className="mt-4 px-3 py-1 bg-terminal-green/10 text-terminal-green text-[10px] rounded border border-terminal-green/30 cursor-default">
                        STATUS: ONLINE
                    </div>
                </div>

                {/* Info Side */}
                <div className="flex flex-col gap-6 w-full">

                    {/* Maintainer Info */}
                    <div className="border border-terminal-dim bg-terminal-board/40 p-6 rounded-lg">
                        <h3 className="font-mono text-lg text-terminal-green mb-4 border-b border-terminal-dim pb-2">// DEVELOPER_INFO</h3>
                        <div className="grid grid-cols-[100px_1fr] gap-2 font-mono text-sm">
                            <span className="text-gray-500">Name:</span>
                            <span className="text-gray-200">Pratham Vishwakarma</span>

                            <span className="text-gray-500">Role:</span>
                            <span className="text-gray-200">Backend and DevOps Engineer</span>

                            <span className="text-gray-500">Links:</span>
                            <div className="flex gap-4">
                                <a href="https://github.com/prathamvish333" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">GitHub</a>
                                <span className="text-terminal-muted mx-2">•</span>
                                <a href="https://www.linkedin.com/in/prathamvishwakarma" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">LinkedIn</a>
                                <span className="text-terminal-muted mx-2">•</span>
                                <a href="mailto:prathamvishwakarma2000@gmail.com" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">Email</a>
                            </div>
                        </div>
                    </div>

                    {/* Tech Specs */}
                    <div className="border border-terminal-dim bg-terminal-board/40 p-6 rounded-lg">
                        <h3 className="font-mono text-lg text-terminal-green mb-4 border-b border-terminal-dim pb-2">// SYSTEM_SPECS</h3>
                        <div className="grid grid-cols-[120px_1fr] gap-y-3 font-mono text-sm">
                            <span className="text-gray-500">Architecture:</span>
                            <span className="text-gray-200">3-Tier Containerized Microservices</span>

                            <span className="text-gray-500">Frontend:</span>
                            <span className="text-gray-200">Next.js 14, React, TailwindCSS, Framer Motion</span>

                            <span className="text-gray-500">Backend:</span>
                            <span className="text-gray-200">FastAPI, Python 3.11, SQLAlchemy</span>

                            <span className="text-gray-500">Database:</span>
                            <span className="text-gray-200">PostgreSQL (ACID-compliant)</span>

                            <span className="text-gray-500">Orchestration:</span>
                            <span className="text-gray-200">Docker Compose & Kubernetes</span>
                        </div>
                    </div>

                    <div className="text-xs font-mono text-gray-500 text-center mt-4">
                        Notes Studio is a production-grade application designed to showcase modern backend architecture and seamless frontend integrations.
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
