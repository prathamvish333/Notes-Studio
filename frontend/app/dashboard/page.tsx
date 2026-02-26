'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import Taskbar from '../../components/Taskbar';

// Define the desktop apps structure
interface AppIcon {
    id: string;
    name: string;
    icon: string;
    action: 'navigate' | 'external';
    url: string;
}

const DESKTOP_APPS: AppIcon[] = [
    { id: '1', name: 'Notes_Dir', icon: '📁', action: 'navigate', url: '/notes' },
    { id: '2', name: 'Hacker_Type', icon: '⌨️', action: 'navigate', url: '/type' },
    { id: '3', name: 'Grafana_Dash', icon: '📊', action: 'external', url: 'http://localhost:3001' },
    { id: '4', name: 'Prometheus', icon: '🔥', action: 'external', url: 'http://localhost:9090' },
    { id: '5', name: 'Jenkins_CI', icon: '⚙️', action: 'external', url: 'http://localhost:8080' },
    { id: '6', name: 'Git_Repo', icon: '🐙', action: 'external', url: 'https://github.com/prathamvish333' },
    { id: '7', name: 'LinkedIn', icon: '💼', action: 'external', url: 'https://www.linkedin.com/in/prathamvishwakarma' },
    { id: '8', name: 'Mail_Sec', icon: '✉️', action: 'external', url: 'mailto:prathamvishwakarma2000@gmail.com' },
    { id: '9', name: 'System_Pref', icon: '🎛️', action: 'navigate', url: '/dashboard/settings' },
    { id: '10', name: 'About_PC', icon: '🖥️', action: 'navigate', url: '/dashboard/about' },
    { id: '11', name: 'Swagger_API', icon: '📘', action: 'external', url: 'http://localhost:8000/docs' }
];

export default function Dashboard() {
    const router = useRouter();
    const { playBlip, playType } = useSoundEffects();
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const constraintsRef = useRef<HTMLDivElement>(null);

    const handleDoubleClick = (app: AppIcon) => {
        playBlip();
        if (app.action === 'navigate') {
            if (app.url !== '#') router.push(app.url);
        } else {
            window.open(app.url, '_blank');
        }
        setSelectedIcon(null);
    };

    const handleClick = (id: string) => {
        playType();
        setSelectedIcon(id);
    };

    return (
        <div className="flex h-screen w-full flex-col bg-transparent overflow-hidden relative select-none">
            {/* Desktop Area */}
            <div
                ref={constraintsRef}
                className="h-[calc(100vh-40px)] p-4 flex flex-col flex-wrap items-start justify-start gap-x-8 gap-y-6 content-start"
                onClick={() => setSelectedIcon(null)} // Deselect when clicking empty space
            >
                {DESKTOP_APPS.map((app) => (
                    <motion.div
                        key={app.id}
                        drag
                        dragConstraints={constraintsRef}
                        dragMomentum={false}
                        className="w-20 group relative flex flex-col items-center justify-start m-1 cursor-pointer z-10"
                        onDoubleClick={() => handleDoubleClick(app)}
                        onClick={(e) => { e.stopPropagation(); handleClick(app.id); }}
                    >
                        <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-1 shadow-lg transition-all border
                                ${selectedIcon === app.id ? 'bg-black/80 border-terminal-green/60 shadow-[0_0_15px_rgba(0,255,65,0.4)]' : 'bg-black/40 border-gray-700 hover:bg-black/60 hover:border-gray-500'}`}
                        >
                            <span className="drop-shadow-md">{app.icon}</span>
                        </div>
                        <span
                            className={`px-1 rounded font-mono text-[11px] leading-tight break-words text-center pointer-events-none ${selectedIcon === app.id ? 'bg-terminal-green text-black font-bold' : 'text-gray-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'}`}
                        >
                            {app.name}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Hint text bottom right */}
            <div className="absolute bottom-12 right-4 font-mono text-[10px] text-gray-500 hidden sm:block pointer-events-none">
                [Double-click icons to launch. Drag to arrange.]
            </div>

            {/* Taskbar */}
            <Taskbar />
        </div>
    );
}
