'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function BootSequence({ children, onComplete, mode = 'boot' }: { children: React.ReactNode, onComplete?: () => void, mode?: 'boot' | 'shutdown' | 'restart' }) {
    const [booting, setBooting] = useState(true);
    const [textIndex, setTextIndex] = useState(0);
    const { playBoot, playType } = useSoundEffects();

    const getLogs = () => {
        if (mode === 'shutdown') {
            return [
                "INITIATING SHUTDOWN SEQUENCE...",
                "TERMINATING SECURE PROTOCOLS...",
                "UNMOUNTING VIRTUAL FILESYSTEM...",
                "HALTING KERNEL...",
                "CONNECTION TERMINATED."
            ];
        } else if (mode === 'restart') {
            return [
                "INITIATING SYSTEM REBOOT...",
                "FLUSHING CACHE...",
                "RESTARTING SERVICES...",
                "KERNEL RELOADED.",
                "RE-ESTABLISHING SECURE CONNECTION..."
            ];
        }
        return [
            "INITIALIZING KERNEL...",
            "MOUNTING VIRTUAL FILESYSTEM...",
            "LOADING SECURE PROTOCOLS...",
            "BYPASSING MAINFRAME ENCRYPTION...",
            "ESTABLISHING SECURE CONNECTION...",
            "ACCESS GRANTED."
        ];
    };

    const bootLogs = getLogs();

    useEffect(() => {
        // Play boot startup sound once on mount
        playBoot();

        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex++;
            setTextIndex(currentIndex);
            playType();

            if (currentIndex >= bootLogs.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setBooting(false);
                    if (onComplete) onComplete();
                }, 800);
            }
        }, 400);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <AnimatePresence>
                {booting && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background font-mono text-terminal-green"
                    >
                        <div className="flex w-full max-w-2xl flex-col items-start px-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mb-8 text-4xl font-bold tracking-widest text-terminal-cyan"
                            >
                                NOTES_STUDIO OS v2.0
                            </motion.div>

                            <div className="flex w-full flex-col space-y-2 text-sm">
                                {bootLogs.slice(0, textIndex + 1).map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`${i === bootLogs.length - 1 ? 'mt-4 text-terminal-cyan font-bold scale-105 origin-left' : ''}`}
                                    >
                                        <span className="mr-4 opacity-50">[{new Date().toISOString().split('T')[1].substring(0, 12)}]</span>
                                        {log}
                                    </motion.div>
                                ))}

                                {textIndex < bootLogs.length && (
                                    <motion.div
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="mt-2 h-4 w-3 bg-terminal-green"
                                    />
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!booting && children}
        </>
    );
}
