'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export default function Dashboard() {
    const router = useRouter();
    const { playBlip, playType } = useSoundEffects();

    const handleNavigate = (path: string) => {
        playBlip();
        router.push(path);
    };

    const handleExternal = (url: string) => {
        playBlip();
        window.open(url, '_blank');
    };

    return (
        <div className="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-12 text-center"
            >
                <h1 className="font-mono text-4xl font-bold tracking-widest text-terminal-green drop-shadow-[0_0_15px_rgba(0,255,65,0.5)]">
          // SYSTEM.COMMAND_CENTER
                </h1>
                <p className="mt-4 font-mono text-sm text-terminal-muted">
                    Select an application module to proceed.
                </p>
            </motion.div>

            <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Modules */}
                <motion.button
                    onClick={() => handleNavigate('/notes')}
                    onMouseEnter={playType}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-xl border border-terminal-green/30 bg-terminal-board/50 p-6 backdrop-blur-md transition-all hover:border-terminal-green hover:bg-terminal-green/10 hover:shadow-terminal-glow"
                >
                    <div className="mb-4 text-5xl opacity-80 group-hover:opacity-100">📁</div>
                    <h2 className="font-mono text-lg font-bold text-terminal-text group-hover:text-terminal-green">Notes_Dir</h2>
                    <p className="mt-2 text-center font-mono text-xs text-terminal-muted">Access encrypted notes database and editor.</p>
                </motion.button>

                <motion.button
                    onClick={() => handleNavigate('/type')}
                    onMouseEnter={playType}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-xl border border-terminal-cyan/30 bg-terminal-board/50 p-6 backdrop-blur-md transition-all hover:border-terminal-cyan hover:bg-terminal-cyan/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                >
                    <div className="mb-4 text-5xl opacity-80 group-hover:opacity-100">⌨️</div>
                    <h2 className="font-mono text-lg font-bold text-terminal-text group-hover:text-terminal-cyan">Hacker_Type</h2>
                    <p className="mt-2 text-center font-mono text-xs text-terminal-muted">Execute typing speed simulation module.</p>
                </motion.button>

                <motion.button
                    onClick={() => handleExternal('http://localhost:80')}
                    onMouseEnter={playType}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-xl border border-orange-500/30 bg-terminal-board/50 p-6 backdrop-blur-md transition-all hover:border-orange-500 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                >
                    <div className="mb-4 text-5xl opacity-80 group-hover:opacity-100">📊</div>
                    <h2 className="font-mono text-lg font-bold text-terminal-text group-hover:text-orange-400">Grafana_Dash</h2>
                    <p className="mt-2 text-center font-mono text-xs text-terminal-muted">Monitor cluster vitals and pod metrics.</p>
                </motion.button>

                <motion.button
                    onClick={() => handleExternal('http://localhost:9090')}
                    onMouseEnter={playType}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-xl border border-red-500/30 bg-terminal-board/50 p-6 backdrop-blur-md transition-all hover:border-red-500 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                >
                    <div className="mb-4 text-5xl opacity-80 group-hover:opacity-100">🔥</div>
                    <h2 className="font-mono text-lg font-bold text-terminal-text group-hover:text-red-400">Prometheus</h2>
                    <p className="mt-2 text-center font-mono text-xs text-terminal-muted">Access raw local time-series data endpoints.</p>
                </motion.button>

                <motion.button
                    onClick={() => handleExternal('http://localhost:8080')}
                    onMouseEnter={playType}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-xl border border-blue-500/30 bg-terminal-board/50 p-6 backdrop-blur-md transition-all hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                >
                    <div className="mb-4 text-5xl opacity-80 group-hover:opacity-100">⚙️</div>
                    <h2 className="font-mono text-lg font-bold text-terminal-text group-hover:text-blue-400">Jenkins_CI/CD</h2>
                    <p className="mt-2 text-center font-mono text-xs text-terminal-muted">Manage automated build and deploy pipelines.</p>
                </motion.button>

                <motion.button
                    onClick={() => handleExternal('https://github.com/prathamvish333')}
                    onMouseEnter={playType}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-xl border border-yellow-500/30 bg-terminal-board/50 p-6 backdrop-blur-md transition-all hover:border-yellow-500 hover:bg-yellow-500/10 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                >
                    <div className="mb-4 text-5xl opacity-80 group-hover:opacity-100">🐙</div>
                    <h2 className="font-mono text-lg font-bold text-terminal-text group-hover:text-yellow-400">Git_Repo</h2>
                    <p className="mt-2 text-center font-mono text-xs text-terminal-muted">View cluster source code architecture.</p>
                </motion.button>
            </div>
        </div>
    );
}
