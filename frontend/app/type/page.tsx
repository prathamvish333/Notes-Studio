'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSoundEffects } from '../../hooks/useSoundEffects';

const HACKER_TEXTS = [
    "sudo rm -rf /var/log/syslog && chmod 777 /etc/passwd",
    "The Matrix is everywhere. It is all around us. Even now, in this very room.",
    "Wake up, Neo... The Matrix has you... Follow the white rabbit.",
    "struct sockaddr_in server_addr; memset(&server_addr, 0, sizeof(server_addr));",
    "import tensorflow as tf; model = tf.keras.Sequential([tf.keras.layers.Dense(128)])",
    "const [data, setData] = useState(null); useEffect(() => { fetchData() }, []);"
];

export default function HackerType() {
    const router = useRouter();
    const { playType, playBlip } = useSoundEffects();

    const [targetText, setTargetText] = useState('');
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<'waiting' | 'running' | 'finished'>('waiting');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        resetGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetGame = () => {
        const randomText = HACKER_TEXTS[Math.floor(Math.random() * HACKER_TEXTS.length)];
        setTargetText(randomText);
        setInput('');
        setStatus('waiting');
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        playType();

        if (status === 'waiting' && val.length === 1) {
            setStatus('running');
            setStartTime(Date.now());
        }

        if (val.length <= targetText.length) {
            setInput(val);
        }

        if (val.length === targetText.length && status === 'running') {
            setStatus('finished');
            calculateFinalStats(val);
        }
    };

    const calculateFinalStats = (finalInput: string) => {
        if (!startTime) return;
        const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes

        let correctChars = 0;
        for (let i = 0; i < finalInput.length; i++) {
            if (finalInput[i] === targetText[i]) {
                correctChars++;
            }
        }

        const calculatedWpm = Math.round((correctChars / 5) / timeElapsed);
        const calculatedAccuracy = Math.round((correctChars / targetText.length) * 100);

        setWpm(calculatedWpm);
        setAccuracy(calculatedAccuracy);
    };

    const renderText = () => {
        return targetText.split('').map((char, index) => {
            let colorClass = 'text-terminal-muted opacity-50';

            if (index < input.length) {
                colorClass = input[index] === char
                    ? 'text-terminal-green drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]'
                    : 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] bg-red-500/20';
            }

            const isCursor = index === input.length && status !== 'finished';

            return (
                <span key={index} className="relative inline-block">
                    {isCursor && (
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="absolute left-0 top-0 h-full w-full bg-terminal-green/50 -z-10"
                        />
                    )}
                    <span className={colorClass}>
                        {char}
                    </span>
                </span>
            );
        });
    };

    return (
        <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center p-8 relative">
            <button
                onClick={() => { playBlip(); router.push('/dashboard'); }}
                className="absolute top-0 left-0 flex items-center text-terminal-muted hover:text-terminal-green transition font-mono text-xs"
            >
                &lt; cd ~/dashboard
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl"
            >
                <div className="mb-8 flex items-end justify-between border-b border-terminal-cyan/30 pb-4">
                    <div>
                        <h1 className="font-mono text-4xl font-bold text-terminal-cyan drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">HACKER_TYPE</h1>
                        <p className="mt-2 font-mono text-xs text-terminal-muted">Execute keystrokes to bypass mainframe firewalls.</p>
                    </div>

                    <div className="flex gap-8 font-mono text-xl">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-terminal-muted uppercase tracking-widest">WPM</span>
                            <span className="text-terminal-green font-bold">{status === 'finished' ? wpm : '---'}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-terminal-muted uppercase tracking-widest">ACCURACY</span>
                            <span className="text-terminal-cyan font-bold">{status === 'finished' ? accuracy + '%' : '---%'}</span>
                        </div>
                    </div>
                </div>

                {/* Hidden Input */}
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInput}
                    disabled={status === 'finished'}
                    className="absolute opacity-0 -z-50"
                    autoFocus
                    onBlur={() => {
                        if (status !== 'finished') {
                            // keep focus
                            setTimeout(() => inputRef.current?.focus(), 10);
                        }
                    }}
                />

                <div
                    onClick={() => inputRef.current?.focus()}
                    className="rounded-xl border border-terminal-dim bg-terminal-board/60 p-10 font-mono text-3xl leading-relaxed tracking-wide shadow-2xl backdrop-blur-md cursor-text min-h-[200px]"
                >
                    {renderText()}
                </div>

                <motion.div
                    animate={{ opacity: status === 'finished' ? 1 : 0, y: status === 'finished' ? 0 : 20 }}
                    className="mt-12 flex justify-center"
                >
                    <button
                        onClick={() => { playBlip(); resetGame(); }}
                        className="flex items-center gap-3 rounded border border-terminal-cyan/50 bg-terminal-cyan/10 px-8 py-3 font-mono text-sm font-bold text-terminal-cyan transition-all hover:bg-terminal-cyan/20 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                    >
                        <span className="text-xl">↻</span> EXECUTE_RETRY
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}
