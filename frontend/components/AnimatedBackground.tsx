import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import MatrixRain from './MatrixRain';

export default function AnimatedBackground({ isRecruiterMode = false }: { isRecruiterMode?: boolean }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState('hacker');
    const pathname = usePathname();
    const isLandingPage = pathname === '/';

    // Parallax layers movement
    const moveX = useTransform(springX, [0, 1000], [-30, 30]);
    const moveY = useTransform(springY, [0, 1000], [-30, 30]);
    
    const moveXDeep = useTransform(springX, [0, 1000], [-15, 15]);
    const moveYDeep = useTransform(springY, [0, 1000], [-15, 15]);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const storedTheme = window.localStorage.getItem('wallpaper_theme') || 'hacker';
            setTheme(storedTheme);
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleThemeChange = () => {
            const newTheme = window.localStorage.getItem('wallpaper_theme') || 'hacker';
            setTheme(newTheme);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('theme_changed', handleThemeChange);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('theme_changed', handleThemeChange);
        };
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    if (theme === 'breathtaking') {
        return (
            <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
                {/* Master Vignette for Depth */}
                <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                
                {/* Moving Atmospheric Blobs */}
                <motion.div
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -50, 80, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -left-20 h-[500px] w-[500px] rounded-full bg-teal-600/10 blur-[120px]"
                />
                
                <motion.div
                    animate={{
                        x: [0, -80, 40, 0],
                        y: [0, 100, -20, 0],
                        scale: [0.8, 1, 0.85, 0.8],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 -right-20 h-[600px] w-[600px] rounded-full bg-teal-700/10 blur-[150px]"
                />

                <motion.div
                    animate={{
                        opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none"
                />
            </div>
        );
    }

    if (theme === 'clean') {
        return <div className="fixed inset-0 -z-10 bg-[#0a0a0a]"></div>;
    }

    if (theme === 'devops') {
        return (
            <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
                <motion.div 
                    style={{ x: moveXDeep, y: moveYDeep, scale: 1.1, backgroundImage: 'url("/brain/e4b00bc3-e9d1-4cd5-80ae-8c4bd1ce0513/wallpaper_devops_3d_pratham_1773350252453.png")' }}
                    className="absolute inset-0 bg-cover bg-center opacity-40 brightness-50"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#134e4a_1px,transparent_1px),linear-gradient(to_bottom,#134e4a_1px,transparent_1px)] bg-[size:60px_60px] opacity-10"></div>
                <motion.div
                    style={{ x: moveX, y: moveY }}
                    className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#0d9488] opacity-10 blur-[100px]"
                />
                <motion.div
                    style={{ x: moveXDeep, y: moveYDeep }}
                    className="absolute -bottom-40 -right-40 h-[800px] w-[800px] rounded-full bg-[#134e4a] opacity-10 blur-[150px]"
                />
            </div>
        );
    }

    // Recruiter Mode: Clean Atmospheric Backdrop
    if (isRecruiterMode) {
        return (
            <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0b1120]">
                <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />
                <div className="absolute inset-0 grid-bg opacity-30" />
                
                <motion.div
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -30, 40, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -left-20 h-[500px] w-[500px] rounded-full bg-teal-600/[0.05] blur-[120px]"
                />
                
                <motion.div
                    animate={{
                        x: [0, -40, 20, 0],
                        y: [0, 50, -10, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 -right-20 h-[600px] w-[600px] rounded-full bg-teal-700/[0.05] blur-[150px]"
                />
            </div>
        );
    }

    // Default 'hacker' theme with parallax
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            <motion.div 
                style={{ x: moveXDeep, y: moveYDeep, scale: 1.1, backgroundImage: 'url("/brain/e4b00bc3-e9d1-4cd5-80ae-8c4bd1ce0513/wallpaper_hacker_3d_pratham_1773350235433.png")' }}
                className="absolute inset-0 bg-cover bg-center opacity-50 brightness-75"
            />
            {!isLandingPage && <MatrixRain />}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

            <motion.div
                style={{ x: moveX, y: moveY }}
                className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-terminal-green opacity-[0.05] blur-[100px]"
            />
            
            {!isLandingPage && (
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 select-none font-mono text-xs text-terminal-teal opacity-20"
                >
                    01001110 01101111 01110100 01100101
                </motion.div>
            )}
        </div>
    );
}
