'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

export default function SystemPreferences() {
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
        <div className="flex h-[calc(100vh-100px)] w-full flex-col">
            <div className="mb-8 flex items-end justify-between border-b border-terminal-green/30 pb-4">
                <div>
                    <h1 className="font-mono text-3xl font-bold text-terminal-green">~/system_pref</h1>
                    <p className="mt-1 font-mono text-xs text-terminal-muted">Personalize Your Desktop Experience</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 overflow-y-auto pb-10 pr-2 custom-scrollbar"
            >
                {/* Wallpapers Section */}
                <div className="border border-terminal-dim bg-terminal-board/40 p-6 rounded-lg">
                    <h3 className="font-mono text-lg text-terminal-green mb-4 border-b border-terminal-dim pb-2">// WALLPAPER_THEME</h3>

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
                                <span className="font-mono text-terminal-green text-[8px] leading-[8px] opacity-70 break-all p-1">
                                    01001000 01100001 01100011 01101011 01100101 01110010
                                    01001000 01100001 01100011 01101011 01100101 01110010
                                    01001000 01100001 01100011 01101011 01100101 01110010
                                </span>
                            </div>
                            <span className="font-mono text-sm text-gray-300">Terminal Hacker</span>
                        </div>

                        {/* DevOps Blue Theme */}
                        <div
                            onClick={() => handleWallpaperChange('devops')}
                            className={`flex flex-col items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${wallpaper === 'devops'
                                ? 'border-blue-400 bg-blue-400/10 shadow-[0_0_15px_rgba(96,165,250,0.2)]'
                                : 'border-terminal-dim bg-black/40 hover:bg-black/60 hover:border-terminal-dim/80'
                                }`}
                        >
                            <div className="w-full h-24 bg-gradient-to-br from-blue-900 to-black rounded shadow-inner flex items-center justify-center border border-gray-800 relative overflow-hidden">
                                {/* Abstract blocks representing containers */}
                                <div className="absolute top-2 left-2 w-4 h-4 bg-blue-500/50 rounded-sm"></div>
                                <div className="absolute top-8 left-10 w-6 h-6 bg-blue-400/30 rounded-sm"></div>
                                <div className="absolute bottom-4 right-6 w-8 h-4 bg-blue-600/40 rounded-sm"></div>
                            </div>
                            <span className="font-mono text-sm text-gray-300">DevOps Deep Blue</span>
                        </div>

                        {/* Clean Dark Theme */}
                        <div
                            onClick={() => handleWallpaperChange('clean')}
                            className={`flex flex-col items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${wallpaper === 'clean'
                                ? 'border-gray-400 bg-gray-400/10 shadow-[0_0_15px_rgba(156,163,175,0.2)]'
                                : 'border-terminal-dim bg-black/40 hover:bg-black/60 hover:border-terminal-dim/80'
                                }`}
                        >
                            <div className="w-full h-24 bg-[#0a0a0a] rounded shadow-inner flex items-center justify-center border border-gray-800">
                                <span className="font-mono text-gray-600 text-xs shadow-none">/* No signal */</span>
                            </div>
                            <span className="font-mono text-sm text-gray-300">Clean Dark</span>
                        </div>
                    </div>
                </div>

                {/* Additional Settings placeholders */}
                <div className="border border-terminal-dim bg-terminal-board/40 p-6 rounded-lg opacity-50">
                    <h3 className="font-mono text-lg text-terminal-green mb-4 border-b border-terminal-dim pb-2">// NETWORK_CONF</h3>
                    <p className="font-mono text-sm text-gray-400">Settings managed by cluster administrator. Edit locked.</p>
                </div>

            </motion.div>
        </div>
    );
}
