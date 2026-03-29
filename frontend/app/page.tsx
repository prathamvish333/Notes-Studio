'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { getApiBaseUrl } from '../lib/config';

const API_BASE_URL = getApiBaseUrl();

type Note = {
    id: number;
    title: string;
    content: string;
    updated_at: string;
};

export default function NotesDirectory({ standalone = false }: { standalone?: boolean }) {
    const router = useRouter();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { playBlip, playType } = useSoundEffects();

    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
    const isLoggedIn = !!token;

    useEffect(() => {
        loadNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadNotes = async () => {
        setLoading(true);
        setError(null);
        try {
            const headers: any = {};
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            const res = await axios.get<Note[]>(`${API_BASE_URL}/notes/`, { headers });
            setNotes(res.data);
        } catch (err: any) {
            if (err.response?.status === 401 && token) {
                window.localStorage.removeItem('token');
                router.push('/login');
                return;
            }
            // Still try to show something for public access
            setError(err.response?.data?.detail || 'Unable to load notes. The API may require authentication.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }
        playBlip();
        setLoading(true);
        try {
            const res = await axios.post<Note>(
                `${API_BASE_URL}/notes/`,
                { title: 'Untitled', content: '' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            router.push(`/${res.data.id}`);
        } catch (err: any) {
            setError('Could not allocate new file.');
            setLoading(false);
        }
    };

    const openNote = (id: number) => {
        playType();
        router.push(`/${id}`);
    };

    return (
        <div className={`flex w-full flex-col ${standalone ? 'h-full p-4' : 'h-[calc(100vh-100px)] p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-terminal-green/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]'}`}>
            <div className="mb-8 flex items-end justify-between border-b border-terminal-green/30 pb-4">
                <div>
                    <h1 className="font-mono text-3xl font-bold text-terminal-green">~/notes</h1>
                    <p className="mt-1 font-mono text-xs text-terminal-muted">
                        {isLoggedIn
                            ? `Access encrypted files (${notes.length} total)`
                            : 'Public read-only mode — login to create or edit notes'
                        }
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    disabled={loading}
                    className="flex h-10 items-center gap-2 rounded bg-terminal-green/20 px-6 font-mono text-xs font-bold text-terminal-green border border-terminal-green/50 transition-all hover:bg-terminal-green/40 hover:shadow-terminal-glow disabled:opacity-50"
                >
                    <span>{isLoggedIn ? 'touch new_note.txt' : '🔒 Login to Create'}</span>
                </button>
            </div>

            {/* Public access banner */}
            {!isLoggedIn && (
                <div className="mb-4 border-l-2 border-blue-500 bg-blue-500/10 p-3 font-mono text-xs text-blue-400">
                    ⓘ Authentication required to create or modify notes. Viewing notes is public for demonstration.
                </div>
            )}

            {error && (
                <div className="mb-4 border-l-2 border-red-500 bg-red-500/10 p-3 font-mono text-xs text-red-400">
                    [ERROR]: {error}
                </div>
            )}

            {loading && notes.length === 0 ? (
                <div className="flex flex-1 items-center justify-center font-mono text-terminal-muted animate-pulse">
                    SCANNING FILESYSTEM...
                </div>
            ) : notes.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center font-mono text-terminal-muted opacity-50">
                    <div className="text-6xl mb-4">📭</div>
                    <p>Directory is empty.</p>
                    {!isLoggedIn && (
                        <button
                            onClick={() => router.push('/login')}
                            className="mt-4 text-terminal-green underline text-xs"
                        >
                            Login to create the first note
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto pb-8 pr-2 custom-scrollbar">
                    {notes.map((note, idx) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <button
                                onClick={() => openNote(note.id)}
                                className="group flex h-40 w-full flex-col items-start overflow-hidden rounded-lg border border-terminal-dim bg-terminal-board/60 p-5 text-left transition-all hover:-translate-y-1 hover:border-terminal-green/50 hover:bg-terminal-dim/80 hover:shadow-[0_4px_20px_rgba(0,255,65,0.1)]"
                            >
                                <div className="flex w-full items-center justify-between font-mono text-xs text-terminal-cyan mb-2">
                                    <span className="font-bold uppercase truncate max-w-[80%]">{note.title || 'untitled.md'}</span>
                                    <span className="opacity-50 group-hover:opacity-100">{new Date(note.updated_at).toLocaleDateString()}</span>
                                </div>
                                <div className="w-full mt-2 font-mono text-[10px] text-terminal-muted line-clamp-4 leading-relaxed group-hover:text-terminal-text transition-colors">
                                    {note.content || '/* empty file */'}
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
