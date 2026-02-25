'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSoundEffects } from '../../hooks/useSoundEffects';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

type Note = {
    id: number;
    title: string;
    content: string;
    updated_at: string;
};

export default function NotesDirectory() {
    const router = useRouter();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { playBlip, playType } = useSoundEffects();

    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }
        loadNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadNotes = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<Note[]>(`${API_BASE_URL}/notes/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotes(res.data);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to load directory.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!token) return;
        playBlip();
        setLoading(true);
        try {
            const res = await axios.post<Note>(
                `${API_BASE_URL}/notes/`,
                { title: 'Untitled', content: '' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            router.push(`/notes/${res.data.id}`);
        } catch (err: any) {
            setError('Could not allocate new file.');
            setLoading(false);
        }
    };

    const openNote = (id: number) => {
        playType();
        router.push(`/notes/${id}`);
    };

    return (
        <div className="flex h-[calc(100vh-100px)] w-full flex-col">
            <div className="mb-8 flex items-end justify-between border-b border-terminal-green/30 pb-4">
                <div>
                    <h1 className="font-mono text-3xl font-bold text-terminal-green">~/notes</h1>
                    <p className="mt-1 font-mono text-xs text-terminal-muted">Access encrypted files ({notes.length} total)</p>
                </div>
                <button
                    onClick={handleCreate}
                    disabled={loading}
                    className="flex h-10 items-center gap-2 rounded bg-terminal-green/20 px-6 font-mono text-xs font-bold text-terminal-green border border-terminal-green/50 transition-all hover:bg-terminal-green/40 hover:shadow-terminal-glow disabled:opacity-50"
                >
                    <span>touch new_note.txt</span>
                </button>
            </div>

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
