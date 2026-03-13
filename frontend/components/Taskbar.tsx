'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSoundContext } from '../context/SoundContext';
import { useOS } from '../context/OSContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { WindowInstance } from './WindowManager';

interface TaskbarProps {
    windows?: WindowInstance[];
    onFocus?: (id: string) => void;
}

export default function Taskbar({ windows = [], onFocus }: TaskbarProps) {
    const router = useRouter();
    const { isMuted, toggleMute } = useSoundContext();
    const { systemState, triggerShutdown, triggerRestart } = useOS();
    const { playBlip, playType } = useSoundEffects();
    const [time, setTime] = useState<Date | null>(null);
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [userEmail, setUserEmail] = useState<string>('guest@notes-studio.com');
    const startMenuRef = useRef<HTMLDivElement>(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (systemState === 'shutting_down') {
            const timer = setTimeout(() => {
                window.localStorage.removeItem('token');
                window.sessionStorage.removeItem('system_booted');
                router.push('/login');
            }, 3000);
            return () => clearTimeout(timer);
        } else if (systemState === 'restarting') {
            const timer = setTimeout(() => {
                window.sessionStorage.removeItem('system_booted');
                window.location.reload();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [systemState, router]);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        
        const checkAuth = () => {
            const token = window.localStorage.getItem('token');
            const storedUser = window.localStorage.getItem('user');
            setIsLoggedIn(!!token);
            
            if (token && storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    if (user && user.email) {
                        setUserEmail(user.email);
                    }
                } catch (e) {
                    console.error("Failed to parse user from localStorage", e);
                }
            } else {
                setUserEmail('GUEST');
            }
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        return () => {
            clearInterval(timer);
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

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
        triggerShutdown();
    };

    const handleRestart = () => {
        playBlip();
        setIsStartOpen(false);
        triggerRestart();
    };

    const handleSoundToggle = () => {
        playType();
        toggleMute();
    };

    const formatSystemTime = (date: Date) => {
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };

    const formatSystemDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 h-10 bg-black/80 border-t border-terminal-green/10 backdrop-blur-xl flex items-center justify-between z-50 px-2 lg:px-4">
            {/* Left side: Start Button & Path */}
            <div className="flex items-center h-full gap-2">
                <div className="relative h-full py-1" ref={startMenuRef}>
                    <button
                        onClick={handleStartToggle}
                        className={`flex items-center h-full gap-2 px-3 py-1 font-mono font-bold transition-all border rounded ${isStartOpen
                            ? 'bg-terminal-green text-black border-terminal-green shadow-terminal-glow'
                            : 'text-terminal-green border-terminal-green/30 hover:bg-terminal-green/10 hover:border-terminal-green/60'
                            }`}
                    >
                        <span className="text-base">⊞</span> 
                        <span className="hidden sm:inline text-[10px] uppercase">Start</span>
                    </button>

                    <AnimatePresence>
                        {isStartOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-11 left-0 w-56 bg-black/95 border border-terminal-green/30 rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
                            >
                                <div className="p-3 border-b border-terminal-green/20 bg-terminal-green/5">
                                    <h3 className="font-mono text-terminal-green font-bold text-[11px]">PRATHAM_OS_v1</h3>
                                </div>
                                <div className="p-1.5 flex flex-col gap-1">
                                    <button onClick={handleRestart} className="flex items-center gap-3 w-full p-2 font-mono text-left text-[11px] text-terminal-text hover:bg-terminal-yellow/10 hover:text-terminal-yellow rounded group transition-all">
                                        <span className="text-base group-hover:rotate-180 transition-transform">🔄</span> Restart Service
                                    </button>
                                    <button onClick={handleShutdown} className="flex items-center gap-3 w-full p-2 font-mono text-left text-[11px] text-terminal-text hover:bg-red-500/10 hover:text-red-400 rounded transition-all">
                                        <span className="text-base">⏻</span> Shut Down
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Running Apps Container */}
                <div className="flex items-center gap-1.5 h-full py-1 px-2 border-l border-terminal-green/10 ml-1 overflow-x-auto scrollbar-hide">
                    {windows.map((win) => (
                        <button
                            key={win.id}
                            onClick={() => onFocus?.(win.id)}
                            className={`flex items-center gap-2 px-3 h-full rounded border transition-all
                                ${win.isMinimized 
                                    ? 'bg-black/40 border-terminal-green/10 text-terminal-muted hover:border-terminal-green/40' 
                                    : 'bg-terminal-green/10 border-terminal-green/40 text-terminal-green shadow-[inset_0_0_10px_rgba(0,255,65,0.05)]'}`}
                        >
                            <span className="text-sm">{win.icon}</span>
                            <span className="hidden md:inline font-mono text-[9px] uppercase font-bold tracking-tighter">{win.title}</span>
                            {!win.isMinimized && <div className="w-1 h-1 rounded-full bg-terminal-green shadow-[0_0_5px_rgba(0,255,65,1)] ml-1" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right side: Utilities */}
            <div className="flex items-center h-full text-[9px] font-mono text-terminal-muted">
                {/* Status Indicator */}
                <div className="hidden lg:flex items-center gap-3 px-4 border-r border-terminal-green/10 h-full">
                    <div className="flex items-center gap-1 text-terminal-cyan">
                        <span>CPU</span>
                        <span className="font-bold">12%</span>
                    </div>
                </div>

                {/* Date & Time */}
                <div className="flex flex-col items-center justify-center px-4 h-full min-w-[80px] sm:min-w-[100px] border-r border-terminal-green/10">
                    {time && (
                        <>
                            <span className="text-terminal-text font-bold">{formatSystemTime(time)}</span>
                            <span className="text-[8px] opacity-60 tracking-wider">{formatSystemDate(time)}</span>
                        </>
                    )}
                </div>

                {/* Sound Toggle */}
                <button
                    onClick={handleSoundToggle}
                    className="flex items-center justify-center px-3 h-full hover:bg-white/5 transition-colors border-r border-terminal-green/10"
                >
                    <span className="text-base">{isMuted ? '🔇' : '🔊'}</span>
                </button>

                {/* User Info */}
                <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_5px_rgba(0,255,65,1)] ${isLoggedIn ? 'bg-terminal-green' : 'bg-terminal-muted'}`} />
                        <span className="text-[9px] font-bold text-terminal-green uppercase tracking-widest hidden md:inline">
                            {isLoggedIn ? (userEmail.split('@')[0]) : 'GUEST'}
                        </span>
                    </div>
                    {!isLoggedIn && (
                        <button
                            onClick={() => router.push('/login')}
                            className="bg-terminal-green/10 border border-terminal-green/30 text-terminal-green px-2 py-0.5 rounded font-mono text-[8px] hover:bg-terminal-green/20 transition-all uppercase font-bold"
                        >
                            Log In
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
