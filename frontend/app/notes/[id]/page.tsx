'use client';

import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export default function NoteEditor() {
    const router = useRouter();
    const params = useParams();
    const noteId = params.id;

    const [draftTitle, setDraftTitle] = useState('');
    const [draftContent, setDraftContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { playBlip, playType } = useSoundEffects();

    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }
        if (noteId) {
            loadNote();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteId]);

    const loadNote = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${API_BASE_URL}/notes/${noteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDraftTitle(res.data.title);
            setDraftContent(res.data.content);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to load file content.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!token || !noteId) return;
        playBlip();
        setSaving(true);
        setError(null);
        try {
            await axios.put(
                `${API_BASE_URL}/notes/${noteId}`,
                { title: draftTitle, content: draftContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            router.push('/notes');
        } catch (err: any) {
            setError('Could not save note changes.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!token || !noteId) return;
        playBlip();
        setSaving(true);
        setError(null);
        try {
            await axios.delete(`${API_BASE_URL}/notes/${noteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            router.push('/notes');
        } catch (err: any) {
            setError('Could not delete note.');
            setSaving(false);
        }
    };

    const handleBack = () => {
        playBlip();
        router.push('/notes');
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center font-mono text-terminal-muted animate-pulse">
                DECRYPTING FILE...
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="terminal-panel flex h-[calc(100vh-100px)] w-full flex-col relative"
        >
            {/* Editor Header */}
            <div className="flex items-center justify-between border-b border-terminal-green/30 bg-terminal-dim/50 px-6 py-4">
                <div className="flex items-center gap-4 flex-1">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-terminal-muted hover:text-terminal-text transition font-mono text-xs"
                    >
                        &lt; cd ..
                    </button>
                    <input
                        type="text"
                        placeholder="filename.md"
                        value={draftTitle}
                        onChange={(e) => { playType(); setDraftTitle(e.target.value); }}
                        className="w-full bg-transparent font-mono text-xl font-bold text-terminal-cyan outline-none placeholder:text-terminal-muted/50"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleDelete}
                        disabled={saving}
                        className="rounded border border-red-500/30 px-4 py-2 font-mono text-xs text-red-400 transition hover:bg-red-500/10 hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] disabled:opacity-50"
                    >
                        rm -rf
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="rounded bg-terminal-green px-6 py-2 font-mono text-xs font-bold text-background transition hover:bg-[#00cc33] hover:shadow-terminal-glow disabled:opacity-70"
                    >
                        {saving ? 'saving...' : ':wq'}
                    </button>
                </div>
            </div>

            <textarea
                placeholder="// type your commands here..."
                value={draftContent}
                onChange={(e) => {
                    playType();
                    setDraftContent(e.target.value);
                }}
                className="h-full w-full resize-none bg-transparent p-8 font-mono text-base leading-relaxed text-terminal-text outline-none placeholder:text-terminal-muted custom-scrollbar"
            />

            {error && (
                <div className="absolute bottom-0 w-full border-t border-red-500/50 bg-red-500/20 px-6 py-3 font-mono text-sm text-red-400 backdrop-blur-md">
                    CRITICAL ERROR: {error}
                </div>
            )}
        </motion.div>
    );
}
