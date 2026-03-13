'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export default function SettingsApp() {
    const { playBlip } = useSoundEffects();
    const [wallpaper, setWallpaper] = useState('hacker');

    useEffect(() => {
        const storedTheme = window.localStorage.getItem('wallpaper_theme') || 'hacker';
        setWallpaper(storedTheme);
    }, []);

    const handleWallpaperChange = (theme: string) => {
        playBlip();
        setWallpaper(theme);
        window.localStorage.setItem('wallpaper_theme', theme);
        // Force an event dispatch so the AnimatedBackground picks it up live
        window.dispatchEvent(new Event('theme_changed'));
    };

    return (
        <div className="flex h-full w-full flex-col p-6 sm:p-10 bg-black/50 overflow-y-auto custom-scrollbar">
            <div className="mb-8 flex items-end justify-between border-b border-terminal-green/30 pb-4">
                <div>
                    <h1 className="font-mono text-xl sm:text-3xl font-bold text-terminal-green">~/system_pref</h1>
                    <p className="mt-1 font-mono text-[10px] sm:text-xs text-terminal-muted lowercase tracking-tighter">Personalize Your Desktop Experience</p>
                </div>
            </div>

            <div className="flex flex-col gap-8 pb-10">
                {/* Wallpapers Section */}
                <div className="border border-terminal-dim bg-terminal-board/40 p-6 rounded-lg shadow-inner">
                    <h3 className="font-mono text-sm sm:text-lg text-terminal-green mb-4 border-b border-terminal-dim pb-2 uppercase tracking-widest font-bold">// DYNAMIC_WALLPAPERS</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Hacker Theme */}
                        <div
                            onClick={() => handleWallpaperChange('hacker')}
                            className={`flex flex-col items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${wallpaper === 'hacker'
                                ? 'border-terminal-green bg-terminal-green/10 shadow-[0_0_15px_rgba(0,255,65,0.2)]'
                                : 'border-terminal-dim bg-black/40 hover:bg-black/60 hover:border-terminal-dim/80'
                                }`}
                        >
                            <div className="w-full h-24 bg-black rounded shadow-inner flex items-center justify-center overflow-hidden border border-gray-800">
                                <div className="w-full h-full bg-cover bg-center opacity-50" style={{ backgroundImage: 'url("/brain/e4b00bc3-e9d1-4cd5-80ae-8c4bd1ce0513/wallpaper_hacker_3d_pratham_1773350235433.png")' }}></div>
                            </div>
                            <span className="font-mono text-xs text-gray-300 uppercase font-bold tracking-widest text-center">3D Pratham_Hacker</span>
                        </div>

                        {/* DevOps Blue Theme */}
                        <div
                            onClick={() => handleWallpaperChange('devops')}
                            className={`flex flex-col items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${wallpaper === 'devops'
                                ? 'border-blue-400 bg-blue-400/10 shadow-[0_0_15px_rgba(96,165,250,0.2)]'
                                : 'border-terminal-dim bg-black/40 hover:bg-black/60 hover:border-terminal-dim/80'
                                }`}
                        >
                            <div className="w-full h-24 bg-black rounded shadow-inner flex items-center justify-center overflow-hidden border border-gray-800">
                                <div className="w-full h-full bg-cover bg-center opacity-50" style={{ backgroundImage: 'url("/brain/e4b00bc3-e9d1-4cd5-80ae-8c4bd1ce0513/wallpaper_devops_3d_pratham_1773350252453.png")' }}></div>
                            </div>
                            <span className="font-mono text-xs text-gray-300 uppercase font-bold tracking-widest text-center">3D Pratham_DevOps</span>
                        </div>

                        {/* Clean Dark Theme */}
                        <div
                            onClick={() => handleWallpaperChange('clean')}
                            className={`flex flex-col items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${wallpaper === 'clean'
                                ? 'border-gray-400 bg-gray-400/10 shadow-[0_0_15px_rgba(156,163,175,0.2)]'
                                : 'border-terminal-dim bg-black/40 hover:bg-black/60 hover:border-terminal-dim/80'
                                }`}
                        >
                            <div className="w-full h-24 bg-[#050505] rounded shadow-inner flex items-center justify-center border border-gray-800">
                                <span className="font-mono text-gray-700 text-[10px] uppercase">/* MINIMAL_VOID */</span>
                            </div>
                            <span className="font-mono text-xs text-gray-300 uppercase font-bold tracking-widest text-center">Clean Void</span>
                        </div>
                    </div>
                </div>

                {/* Additional Settings placeholders */}
                <div className="border border-terminal-dim bg-terminal-board/40 p-6 rounded-lg opacity-40">
                    <h3 className="font-mono text-sm sm:text-lg text-terminal-green mb-4 border-b border-terminal-dim pb-2 uppercase tracking-widest font-bold">// NETWORK_CONF</h3>
                    <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Distributed node configuration managed by Kubernetes master. System lock active.</p>
                </div>
            </div>
        </div>
    );
}
