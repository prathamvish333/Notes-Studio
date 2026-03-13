'use client';

import { useState } from 'react';
import { VIRTUAL_FS, getPathNodes, FSNode } from '../../lib/OSFilesystem';
import { motion } from 'framer-motion';

interface FileExplorerProps {
    onOpenFile: (node: FSNode) => void;
}

export default function FileExplorer({ onOpenFile }: FileExplorerProps) {
    const [currentPath, setCurrentPath] = useState('/home/pratham');
    const nodes = getPathNodes(currentPath) || [];

    const handleNodeClick = (node: FSNode) => {
        if (node.type === 'dir') {
            setCurrentPath(`${currentPath}/${node.name}`);
        } else {
            onOpenFile(node);
        }
    };

    const navigateBack = () => {
        const parts = currentPath.split('/').filter(Boolean);
        if (parts.length > 0) {
            parts.pop();
            setCurrentPath('/' + parts.join('/'));
        }
    };

    return (
        <div className="flex h-full w-full flex-col bg-terminal-board/10 p-4 select-none">
            {/* Toolbar */}
            <div className="flex items-center gap-4 border-b border-terminal-green/20 pb-4 mb-4">
                <button 
                    onClick={navigateBack}
                    className="p-1.5 rounded hover:bg-terminal-green/20 transition-colors disabled:opacity-30"
                    disabled={currentPath === '/'}
                >
                    <span className="text-xl">⬅️</span>
                </button>
                <div className="flex-1 bg-black/40 rounded border border-terminal-green/20 px-3 py-1.5 font-mono text-[11px] text-terminal-muted">
                    {currentPath}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 overflow-y-auto custom-scrollbar p-2">
                {nodes.map((node, i) => (
                    <motion.div
                        key={node.name + i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onDoubleClick={() => handleNodeClick(node)}
                        onClick={() => {}} // Could add single click selection
                        className="group flex flex-col items-center gap-2 cursor-pointer p-2 rounded hover:bg-terminal-green/5 transition-all"
                    >
                        <div className="text-4xl filter group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">
                            {node.type === 'dir' ? '📁' : (node.icon || '📄')}
                        </div>
                        <span className="font-mono text-[10px] text-center text-terminal-text group-hover:text-terminal-green truncate w-full px-1">
                            {node.name}
                        </span>
                    </motion.div>
                ))}
            </div>

            {nodes.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center opacity-30 grayscale font-mono text-xs">
                    <span>(empty directory)</span>
                </div>
            )}
        </div>
    );
}
