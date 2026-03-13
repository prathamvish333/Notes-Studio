'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import Taskbar from '../../components/Taskbar';
import WindowManager, { WindowInstance } from '../../components/WindowManager';
import Terminal from '../../components/apps/Terminal';
import FileExplorer from '../../components/apps/FileExplorer';
import AboutApp from '../../components/apps/AboutApp';
import SettingsApp from '../../components/apps/SettingsApp';
import { getExternalUrl } from '../../lib/config';

interface AppIcon {
    id: string;
    name: string;
    icon: string;
    component?: 'terminal' | 'explorer' | 'notes' | 'type' | 'about' | 'settings'; // Internal apps
    action: 'window' | 'external';
    url: string;
}

const DESKTOP_APPS: AppIcon[] = [
    { id: '1', name: 'File_Explorer', icon: '📁', action: 'window', component: 'explorer', url: '' },
    { id: '2', name: 'Terminal_CLI', icon: '💻', action: 'window', component: 'terminal', url: '' },
    { id: '3', name: 'Notes_Studio', icon: '📝', action: 'window', component: 'notes', url: '' },
    { id: '4', name: 'Hacker_Type', icon: '⌨️', action: 'window', component: 'type', url: '' },
    { id: '5', name: 'Grafana', icon: '📊', action: 'external', url: getExternalUrl('grafana') },
    { id: '6', name: 'Prometheus', icon: '🔥', action: 'external', url: getExternalUrl('prometheus') },
    { id: '7', name: 'Jenkins', icon: '⚙️', action: 'external', url: getExternalUrl('jenkins') },
    { id: '8', name: 'Notes_Studio_Swagger', icon: '🔌', action: 'external', url: getExternalUrl('swagger') },
    { id: '9', name: "Pratham's Resume", icon: '📄', action: 'external', url: '/Prathams_Resume.pdf' },
    { id: '10', name: 'About_PC', icon: 'ℹ️', action: 'window', component: 'about', url: '' },
    { id: '11', name: 'Preferences', icon: '⚙️', action: 'window', component: 'settings', url: '' },
    { id: '12', name: 'Git_Repo', icon: '🐙', action: 'external', url: 'https://github.com/prathamvish333' },
    { id: '13', name: 'LinkedIn', icon: '💼', action: 'external', url: 'https://www.linkedin.com/in/prathamvishwakarma' }
];

export default function Dashboard() {
    const router = useRouter();
    const { playBlip, playType } = useSoundEffects();
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [windows, setWindows] = useState<WindowInstance[]>([]);
    const [nextZIndex, setNextZIndex] = useState(100);
    const constraintsRef = useRef<HTMLDivElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAccessDenied, setShowAccessDenied] = useState<{ isOpen: boolean; appName: string }>({ isOpen: false, appName: '' });
    const [textViewing, setTextViewing] = useState<{ isOpen: boolean; title: string; content: string }>({ isOpen: false, title: '', content: '' });

    useEffect(() => {
        const checkAuth = () => {
            const token = window.localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };
        checkAuth();
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const openWindow = useCallback((app: AppIcon) => {
        // Auth Guard for restricted apps
        if (app.id === '3' && !window.localStorage.getItem('token')) {
            setShowAccessDenied({ isOpen: true, appName: app.name });
            playBlip();
            return;
        }

        setWindows(prev => {
            const existing = prev.find(w => w.id === app.id);
            if (existing) {
                // If minimized, restore it. Always bring to front.
                return prev.map(w => w.id === app.id 
                    ? { ...w, isMinimized: false, zIndex: nextZIndex } 
                    : w
                );
            }

            let component: React.ReactNode = null;
            if (app.component === 'terminal') component = <Terminal onLaunchApp={(name) => {
                const found = DESKTOP_APPS.find(a => a.name.toLowerCase().includes(name.toLowerCase()));
                if (found) openWindow(found);
            }} />;
            if (app.component === 'explorer') component = <FileExplorer onOpenFile={(node) => {
                if (node.name.toLowerCase().endsWith('.pdf')) {
                    window.open('/Prathams_Resume.pdf', '_blank');
                    return;
                }
                
                if (node.name.toLowerCase().endsWith('.txt')) {
                    setTextViewing({ isOpen: true, title: node.name, content: node.content || 'No content found.' });
                    playBlip();
                    return;
                }

                // Check if it's an application node or monitoring node
                const appMatch = DESKTOP_APPS.find(a => 
                    a.name === node.name || 
                    a.name.toLowerCase().replace('_', ' ').includes(node.name.toLowerCase().replace('_', ' ')) ||
                    (node.name === 'Terminal' && a.id === '2') ||
                    (node.name === 'Notes_Studio' && a.id === '3')
                );
                if (appMatch) {
                    if (appMatch.action === 'external') {
                        window.open(appMatch.url, '_blank');
                    } else {
                        openWindow(appMatch);
                    }
                }
            }} />;
            
            // Use iframe with ?window=true to hide redundant layout
            if (app.component === 'notes') component = <iframe src="/notes?window=true" className="w-full h-full border-none bg-transparent" />;
            if (app.component === 'type') component = <iframe src="/type?window=true" className="w-full h-full border-none bg-transparent" />;
            if (app.component === 'about') component = <AboutApp />;
            if (app.component === 'settings') component = <SettingsApp />;

            const newWin: WindowInstance = {
                id: app.id,
                title: app.name,
                icon: app.icon,
                isOpen: true,
                isMinimized: false,
                isMaximized: false,
                zIndex: nextZIndex,
                component
            };
            return [...prev, newWin];
        });
        setNextZIndex(prev => prev + 1);
    }, [nextZIndex, playBlip]);

    const handleDoubleClick = (app: AppIcon) => {
        playBlip();
        if (app.action === 'window') {
            openWindow(app);
        } else {
            window.open(app.url, '_blank');
        }
        setSelectedIcon(null);
    };

    const closeWindow = (id: string) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    };

    const minimizeWindow = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    };

    const focusWindow = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w));
        setNextZIndex(prev => prev + 1);
    };

    const toggleMaximize = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
    };

    return (
        <div className="flex h-screen w-full flex-col bg-transparent overflow-hidden relative select-none">
            {/* Desktop Area */}
            <div
                ref={constraintsRef}
                className="flex-1 p-6 sm:p-10 lg:p-12 flex flex-col flex-wrap content-start items-start gap-6 sm:gap-8 lg:gap-10 overflow-y-auto md:overflow-hidden scrollbar-hide h-full max-h-[calc(100vh-64px)]"
                onClick={() => setSelectedIcon(null)}
            >
                {DESKTOP_APPS.map((app) => (
                    <motion.div
                        key={app.id}
                        drag
                        dragConstraints={constraintsRef}
                        dragMomentum={false}
                        className="w-20 sm:w-24 group relative flex flex-col items-center justify-start cursor-pointer z-10"
                        onDoubleClick={() => handleDoubleClick(app)}
                        onClick={(e) => { e.stopPropagation(); setSelectedIcon(app.id); playType(); }}
                    >
                        <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-1 shadow-lg transition-all border
                                ${selectedIcon === app.id ? 'bg-terminal-green/20 border-terminal-green/60 shadow-[0_0_20px_rgba(0,255,65,0.4)]' : 'bg-black/40 border-gray-700/50 hover:bg-black/60 hover:border-gray-500'}`}
                        >
                            <span className="drop-shadow-md">{app.icon}</span>
                        </div>
                        <span
                            className={`px-1 rounded font-mono text-[9px] sm:text-[10px] leading-tight break-words text-center pointer-events-none transition-colors
                                ${selectedIcon === app.id ? 'bg-terminal-green text-black font-bold' : 'text-gray-300 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]'}`}
                        >
                            {app.name}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Window Manager */}
            <WindowManager 
                windows={windows} 
                onClose={closeWindow} 
                onMinimize={minimizeWindow} 
                onFocus={focusWindow}
                onToggleMaximize={toggleMaximize}
            />

            {/* Taskbar */}
            <Taskbar windows={windows} onFocus={focusWindow} />

            {/* Text Viewer Modal */}
            <AnimatePresence>
                {textViewing.isOpen && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-2xl rounded-lg border border-terminal-green/30 bg-black shadow-[0_0_40px_rgba(0,0,0,0.8)]"
                        >
                            <div className="flex items-center justify-between border-b border-terminal-green/20 bg-terminal-green/5 px-4 py-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">📝</span>
                                    <span className="font-mono text-xs font-bold text-terminal-green uppercase">{textViewing.title}</span>
                                </div>
                                <button 
                                    onClick={() => setTextViewing({ ...textViewing, isOpen: false })}
                                    className="text-terminal-muted hover:text-red-400 transition-colors font-bold"
                                >
                                    [X]
                                </button>
                            </div>
                            <div className="p-6 h-[400px] overflow-y-auto custom-scrollbar font-mono text-xs text-terminal-text leading-relaxed whitespace-pre-wrap">
                                {textViewing.content}
                            </div>
                            <div className="border-t border-terminal-green/10 bg-black px-4 py-2 text-right">
                                <button
                                    onClick={() => setTextViewing({ ...textViewing, isOpen: false })}
                                    className="rounded border border-terminal-green/30 px-4 py-1.5 font-mono text-[10px] text-terminal-green hover:bg-terminal-green/10"
                                >
                                    &gt; OK_SIG
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-12 right-6 font-mono text-[9px] text-gray-500 hidden sm:block pointer-events-none uppercase tracking-widest opacity-30">
                [ Pratham's OS v3.0 // System: Stable ]
            </div>

            {/* Access Denied Modal */}
            <AnimatePresence>
                {showAccessDenied.isOpen && (
                    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="w-full max-w-md rounded-xl border border-red-500/50 bg-black/80 p-8 text-center shadow-[0_0_50px_rgba(239,68,68,0.2)]"
                        >
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-4xl text-red-500 animate-pulse">
                                🚫
                            </div>
                            <h2 className="mb-2 font-mono text-2xl font-bold text-red-500 uppercase tracking-widest">Access_Denied</h2>
                            <p className="mb-8 font-mono text-sm text-gray-400">
                                Authentication required to access <span className="text-terminal-green">{showAccessDenied.appName}</span>. 
                                Please login to proceed.
                            </p>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        setShowAccessDenied({ isOpen: false, appName: '' });
                                        router.push('/login');
                                    }}
                                    className="w-full rounded-lg bg-red-500 py-3 font-mono text-sm font-bold text-white transition-all hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                                >
                                    &gt; INITIALIZE_LOGIN_SEQUENCE
                                </button>
                                <button
                                    onClick={() => setShowAccessDenied({ isOpen: false, appName: '' })}
                                    className="w-full rounded-lg border border-gray-700 py-3 font-mono text-sm text-gray-400 transition-all hover:bg-white/5"
                                >
                                    &gt; TERMINATE_REQUEST
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
