import AIChat from '@/components/devops/AIChat';

export default function DevOpsPage() {
    return (
        <div className="min-h-screen bg-[#040814] text-gray-200 p-8 font-sans">
            <header className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 tracking-tight">
                        DevOps MCP AI Center
                    </h1>
                    <p className="text-gray-500 mt-2 tracking-wide text-sm font-mono">
                        Model Context Protocol (MCP) Powered Orchestration
                    </p>
                </div>
                <div className="hidden md:flex gap-3">
                    <span className="px-3 py-1 text-xs font-bold font-mono text-teal-400 bg-teal-500/10 border border-teal-500/30 rounded-full">MCP SERVER: ONLINE</span>
                    <span className="px-3 py-1 text-xs font-bold font-mono text-purple-400 bg-purple-500/10 border border-purple-500/30 rounded-full">GEMINI 2.5 FLASH</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-180px)]">
                
                {/* Left Side: Static Dashboards / Context Panels */}
                <div className="lg:col-span-1 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
                    
                    {/* Status Card 1: Kubernetes */}
                    <div className="bg-[#0b1120] border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-teal-500/30 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                            <svg className="w-24 h-24 text-teal-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 13l-10-5v5l10 5 10-5v-5l-10 5z"/></svg>
                        </div>
                        <h3 className="text-teal-500 font-bold mb-3 uppercase text-xs tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)] animate-pulse" />
                            Cluster Status
                        </h3>
                        <p className="text-4xl font-black text-white">notes-dev</p>
                        <p className="text-sm text-gray-400 mt-2 font-mono">MicroK8s · 1 Node · Healthy</p>
                    </div>

                    {/* Status Card 2: Security */}
                    <div className="bg-[#0b1120] border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-red-500/30 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                            <svg className="w-24 h-24 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                        </div>
                        <h3 className="text-red-400 font-bold mb-3 uppercase text-xs tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]" />
                            Security Posture
                        </h3>
                        <p className="text-4xl font-black text-white">Active</p>
                        <p className="text-sm text-gray-400 mt-2 font-mono">Trivy & SonarQube enabled</p>
                    </div>

                    {/* Status Card 3: CI/CD */}
                    <div className="bg-[#0b1120] border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                            <svg className="w-24 h-24 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/></svg>
                        </div>
                        <h3 className="text-blue-400 font-bold mb-3 uppercase text-xs tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />
                            Deployment
                        </h3>
                        <p className="text-4xl font-black text-white">GitOps</p>
                        <p className="text-sm text-gray-400 mt-2 font-mono">ArgoCD & Jenkins pipelines</p>
                    </div>

                </div>

                {/* Right Side: AI Terminal */}
                <div className="lg:col-span-2 h-full rounded-2xl overflow-hidden shadow-2xl">
                    <AIChat />
                </div>

            </div>
        </div>
    );
}
