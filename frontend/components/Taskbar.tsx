'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSoundContext } from '../context/SoundContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function Taskbar() {
    const router = useRouter();
    const { isMuted, toggleMute } = useSoundContext();
    const { playBlip, playType } = useSoundEffects();
    const [time, setTime] = useState<Date | null>(null);
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [powerState, setPowerState] = useState<'shutdown' | 'restart' | null>(null);
    const startMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Close start menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
                setIsStartOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleStartToggle = () => {
        playBlip();
        setIsStartOpen(!isStartOpen);
    };

    const handleShutdown = () => {
        playBlip();
        setIsStartOpen(false);
        setPowerState('shutdown');
    };

    const handleRestart = () => {
        playBlip();
        setIsStartOpen(false);
        setPowerState('restart');
    };

    const handleSoundToggle = () => {
        playType();
        toggleMute();
    };

    const formatSystemTime = (date: Date) => {
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const formatSystemDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    if (powerState) {
        const BootSequence = require('./BootSequence').default;
        return (
            <BootSequence
                mode={powerState}
                onComplete={() => {
                    if (powerState === 'shutdown') {
                        window.localStorage.removeItem('token');
                        router.push('/login');
                    } else {
                        window.location.reload();
                    }
                }}
            >
                <div />
            </BootSequence>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 h-10 bg-black/90 border-t border-terminal-green/20 backdrop-blur-md flex items-center justify-between z-50">
            {/* Left side: Start Button & Path */}
            <div className="flex items-center h-full">
                <div className="relative h-full" ref={startMenuRef}>
                    <button
                        onClick={handleStartToggle}
                        onMouseEnter={() => !isStartOpen && playType()}
                        className={`flex items-center h-full gap-2 px-4 py-2 font-mono font-bold transition-all border rounded ${isStartOpen
                            ? 'bg-terminal-green text-black border-terminal-green shadow-terminal-glow'
                            : 'text-terminal-green border-terminal-green/50 hover:bg-terminal-green/20 hover:border-terminal-green hover:shadow-terminal-glow'
                            }`}
                    >
                        <span className="text-xl">⊞</span> Start
                    </button>

                    {/* Start Menu Popup */}
                    <AnimatePresence>
                        {isStartOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-10 left-0 w-64 bg-black/95 border border-terminal-green/30 rounded-tr-xl overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.1)] backdrop-blur-xl"
                            >
                                <div className="p-4 border-b border-terminal-green/30 bg-terminal-green/10">
                                    <h3 className="font-mono text-terminal-green font-bold text-sm">SYSTEM_MENU</h3>
                                    <p className="font-mono text-[10px] text-terminal-muted">Select operation</p>
                                </div>
                                <div className="p-2 flex flex-col gap-1">
                                    <button
                                        onClick={handleRestart}
                                        onMouseEnter={playType}
                                        className="flex items-center gap-3 w-full p-2.5 font-mono text-left text-sm text-terminal-text hover:bg-terminal-yellow/10 hover:text-terminal-yellow rounded transition-colors group"
                                    >
                                        <span className="text-lg group-hover:animate-spin">🔄</span> Restart
                                    </button>
                                    <button
                                        onClick={handleShutdown}
                                        onMouseEnter={playType}
                                        className="flex items-center gap-3 w-full p-2.5 font-mono text-left text-sm text-terminal-text hover:bg-red-500/10 hover:text-red-400 rounded transition-colors"
                                    >
                                        <span className="text-lg">⏻</span> Shutdown
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="ml-4 font-mono text-xs hidden sm:flex items-center">
                    <span className="text-terminal-cyan font-bold">PRATHAM_OS</span>
                    <span className="text-terminal-muted ml-2">~/vishwakarma</span>
                </div>
            </div>

            {/* Right side: Utilities */}
            <div className="flex items-center h-full text-[10px] sm:text-xs font-mono text-terminal-muted pr-4">
                {/* Network Speed (Mock) */}
                <div className="flex items-center gap-1 px-3 border-r border-terminal-green/20 h-full text-terminal-cyan">
                    <span>⬇</span>
                    <span>1.3 Gbps</span>
                </div>

                {/* Date & Time */}
                <div className="flex items-center justify-center px-4 border-r border-terminal-green/20 h-full min-w-[140px]">
                    {time ? (
                        <span>{formatSystemDate(time)} &nbsp; {formatSystemTime(time)}</span>
                    ) : (
                        <span>--/--/---- --:--:--</span>
                    )}
                </div>

                {/* Sound Toggle */}
                <button
                    onClick={handleSoundToggle}
                    className="flex items-center justify-center px-3 border-r border-terminal-green/20 h-full hover:bg-white/5 transition-colors"
                    title={isMuted ? "Sound Off" : "Sound On"}
                >
                    <span className="text-sm">{isMuted ? '🔇' : '🔊'}</span>
                </button>

                {/* User Status */}
                <div className="flex items-center gap-1.5 pl-3 h-full">
                    <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></div>
                    <span className="text-gray-300">p3@gmail.com</span>
                </div>
            </div>
        </div>
    );
}
