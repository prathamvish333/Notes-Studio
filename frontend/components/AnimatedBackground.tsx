'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import MatrixRain from './MatrixRain';

export default function AnimatedBackground() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState('hacker');

    useEffect(() => {
        setMounted(true);
        // Load initial theme
        const storedTheme = window.localStorage.getItem('wallpaper_theme') || 'hacker';
        setTheme(storedTheme);

        // Listen for live updates
        const handleThemeChange = () => {
            const newTheme = window.localStorage.getItem('wallpaper_theme') || 'hacker';
            setTheme(newTheme);
        };

        window.addEventListener('theme_changed', handleThemeChange);
        return () => window.removeEventListener('theme_changed', handleThemeChange);
    }, []);

    if (!mounted) return null;

    if (theme === 'clean') {
        return <div className="fixed inset-0 -z-10 bg-[#0a0a0a]"></div>;
    }

    if (theme === 'devops') {
        return (
            <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#020617]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e40af_1px,transparent_1px),linear-gradient(to_bottom,#1e40af_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
                <motion.div
                    style={{ y: y1 }}
                    className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-500 opacity-10 blur-[100px]"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute -bottom-40 -right-40 h-[800px] w-[800px] rounded-full bg-cyan-600 opacity-10 blur-[150px]"
                />
            </div>
        );
    }

    // Default 'hacker' theme
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            <MatrixRain />
            {/* Deep Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

            {/* Floating Blobs / Glows */}
            <motion.div
                style={{ y: y1 }}
                className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-terminal-green opacity-[0.03] blur-[100px]"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-terminal-cyan opacity-[0.02] blur-[120px]"
            />

            {/* Binary / Hex Code Floating Background Elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 select-none font-mono text-xs text-terminal-green opacity-20"
            >
                01001110 01101111 01110100 01100101
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 30, 0],
                    opacity: [0.05, 0.2, 0.05]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-1/3 right-1/4 select-none font-mono text-xs text-terminal-cyan opacity-20"
            >
                sudo systemctl start notes-studio
            </motion.div>
        </div>
    );
}
