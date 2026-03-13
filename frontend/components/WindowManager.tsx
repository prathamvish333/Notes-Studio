'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface WindowInstance {
    id: string;
    title: string;
    icon: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    component: React.ReactNode;
}

interface WindowManagerProps {
    windows: WindowInstance[];
    onClose: (id: string) => void;
    onMinimize: (id: string) => void;
    onFocus: (id: string) => void;
    onToggleMaximize: (id: string) => void;
}

export default function WindowManager({ windows, onClose, onMinimize, onFocus, onToggleMaximize }: WindowManagerProps) {
    return (
        <AnimatePresence>
            {windows.map((win) => (
                !win.isMinimized && win.isOpen && (
                    <motion.div
                        key={win.id}
                        drag
                        dragMomentum={false}
                        dragHandleClassName="window-header"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            y: 0,
                            width: win.isMaximized ? '100%' : 'min(95vw, 800px)',
                            height: win.isMaximized ? 'calc(100vh - 40px)' : 'min(70vh, 500px)',
                            top: win.isMaximized ? 0 : '10%',
                            left: win.isMaximized ? 0 : 'max(2.5vw, calc(50% - 400px))',
                        }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={() => onFocus(win.id)}
                        style={{ zIndex: win.zIndex }}
                        className={`fixed flex flex-col overflow-hidden rounded-lg border border-terminal-green/40 bg-black/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl ${win.isMaximized ? 'rounded-none' : ''}`}
                    >
                        {/* Window Header */}
                        <div className="window-header flex h-9 items-center justify-between border-b border-terminal-green/20 bg-terminal-green/5 px-3 cursor-move active:cursor-grabbing select-none">
                            <div className="flex items-center gap-2">
                                <span className="text-sm">{win.icon}</span>
                                <span className="font-mono text-[11px] font-bold text-terminal-green uppercase tracking-widest">{win.title}</span>
                            </div>
                            
                            <div className="flex items-center gap-1.5">
                                {/* Minimize */}
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }}
                                    className="group flex h-5 w-5 items-center justify-center rounded-sm bg-terminal-dim/30 hover:bg-terminal-cyan/20 transition-colors"
                                >
                                    <div className="h-[2px] w-2 bg-terminal-muted group-hover:bg-terminal-cyan" />
                                </button>
                                
                                {/* Maximize */}
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onToggleMaximize(win.id); }}
                                    className="group flex h-5 w-5 items-center justify-center rounded-sm bg-terminal-dim/30 hover:bg-terminal-green/20 transition-colors"
                                >
                                    <div className={`border-[1.5px] border-terminal-muted group-hover:border-terminal-green ${win.isMaximized ? 'h-2 w-2' : 'h-2.5 w-2.5'}`} />
                                </button>
                                
                                {/* Close */}
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
                                    className="group flex h-5 w-5 items-center justify-center rounded-sm bg-terminal-dim/30 hover:bg-red-500/20 transition-colors"
                                >
                                    <span className="font-mono text-[10px] text-terminal-muted group-hover:text-red-500">×</span>
                                </button>
                            </div>
                        </div>

                        {/* Window Content */}
                        <div className="flex-1 overflow-auto bg-terminal-board/20 custom-scrollbar">
                            {win.component}
                        </div>
                    </motion.div>
                )
            ))}
        </AnimatePresence>
    );
}
