'use client';

import { useState, useRef, useEffect } from 'react';
import { VIRTUAL_FS, getPathNodes, FSNode } from '../../lib/OSFilesystem';

interface TerminalProps {
    onLaunchApp: (appName: string) => void;
}

export default function Terminal({ onLaunchApp }: TerminalProps) {
    const [history, setHistory] = useState<string[]>([
        'Welcome to Portfolio OS v1.0.0 (AMD64)',
        'Type "help" to see available commands.',
        ''
    ]);
    const [input, setInput] = useState('');
    const [currentPath, setCurrentPath] = useState('/home/pratham');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const fullCmd = cmd.trim();
        const [base, ...args] = fullCmd.split(' ');
        const newHistory = [...history, `pratham@portfolio:${currentPath}$ ${fullCmd}`];

        switch (base.toLowerCase()) {
            case 'help':
                newHistory.push(
                    'Available commands:',
                    '  ls      - List directory contents',
                    '  cd      - Change directory',
                    '  cat     - Read file content',
                    '  clear   - Clear terminal screen',
                    '  help    - Show this help message',
                    '  open    - Launch an application (e.g., open Notes_App)',
                    '  whoami  - Print current user'
                );
                break;
            case 'ls':
                const nodes = getPathNodes(currentPath);
                if (nodes) {
                    const list = nodes.map(n => n.type === 'dir' ? `\x1b[34m${n.name}/\x1b[0m` : n.name).join('  ');
                    newHistory.push(list || '(empty)');
                }
                break;
            case 'cd':
                const target = args[0];
                if (!target || target === '~' || target === '/home/pratham') {
                    setCurrentPath('/home/pratham');
                } else if (target === '..') {
                    const parts = currentPath.split('/').filter(Boolean);
                    if (parts.length > 0) {
                        parts.pop();
                        setCurrentPath('/' + parts.join('/'));
                    }
                } else {
                    const newPath = currentPath === '/' ? `/${target}` : `${currentPath}/${target}`;
                    if (getPathNodes(newPath)) {
                        setCurrentPath(newPath);
                    } else {
                        newHistory.push(`cd: no such directory: ${target}`);
                    }
                }
                break;
            case 'cat':
                const file = args[0];
                const dirNodes = getPathNodes(currentPath);
                const foundFile = dirNodes?.find(n => n.name === file && n.type === 'file');
                if (foundFile) {
                    newHistory.push(foundFile.content || `[Binary data from ${file}]`);
                } else {
                    newHistory.push(`cat: ${file}: No such file`);
                }
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'whoami':
                newHistory.push('pratham');
                break;
            case 'open':
                const app = args[0];
                if (app) {
                    onLaunchApp(app);
                    newHistory.push(`Launching ${app}...`);
                } else {
                    newHistory.push('Usage: open [AppName]');
                }
                break;
            case '':
                break;
            default:
                newHistory.push(`command not found: ${base}`);
        }

        setHistory(newHistory);
        setInput('');
    };

    return (
        <div 
            className="flex h-full w-full flex-col bg-black/40 p-4 font-mono text-xs text-terminal-green"
            onClick={() => document.getElementById('term-input')?.focus()}
        >
            <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar">
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap mb-1 leading-relaxed">
                        {line}
                    </div>
                ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
                <span className="text-terminal-cyan shrink-0">pratham@portfolio:{currentPath}$</span>
                <input
                    id="term-input"
                    type="text"
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
                    className="flex-1 bg-transparent outline-none border-none text-terminal-text"
                />
            </div>
        </div>
    );
}
