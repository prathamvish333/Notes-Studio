'use client';

import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

import { getApiBaseUrl } from '../../../lib/config';

const API_BASE_URL = getApiBaseUrl();

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
    const isReadOnly = !token;

    useEffect(() => {
        if (noteId) {
            loadNote();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteId]);

    const loadNote = async () => {
        setLoading(true);
        setError(null);
        try {
            const headers: any = {};
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            const res = await axios.get(`${API_BASE_URL}/notes/${noteId}`, { headers });
            setDraftTitle(res.data.title);
            setDraftContent(res.data.content);
        } catch (err: any) {
            if (err.response?.status === 401 && token) {
                window.localStorage.removeItem('token');
                router.push(`/login?redirect=/notes/${noteId}`);
                return;
            }
            setError(err.response?.data?.detail || 'Failed to load file content.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (isReadOnly || !noteId) return;
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
        if (isReadOnly || !noteId) return;
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
            className="terminal-panel flex h-[calc(100vh-100px)] w-full flex-col relative bg-black/40 backdrop-blur-md rounded-2xl border border-terminal-green/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] overflow-hidden"
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
                        readOnly={isReadOnly}
                        onChange={(e) => { 
                            if (isReadOnly) return;
                            playType(); 
                            setDraftTitle(e.target.value); 
                        }}
                        className={`w-full bg-transparent font-mono text-xl font-bold text-terminal-cyan outline-none placeholder:text-terminal-muted/50 ${isReadOnly ? 'cursor-default' : ''}`}
                    />
                </div>

                <div className="flex gap-3">
                    {!isReadOnly && (
                        <>
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
                        </>
                    )}
                    {isReadOnly && (
                        <button
                            onClick={() => router.push('/login')}
                            className="rounded bg-blue-600 px-6 py-2 font-mono text-xs font-bold text-white transition hover:bg-blue-500"
                        >
                            Login to Edit
                        </button>
                    )}
                </div>
            </div>

            {/* Read-only Banner */}
            {isReadOnly && (
                <div className="bg-blue-500/10 px-8 py-2 border-b border-blue-500/20 font-mono text-[10px] text-blue-400 flex items-center gap-2">
                    <span className="animate-pulse">●</span> READ-ONLY MODE — View access granted for demonstration purposes.
                </div>
            )}

            <textarea
                placeholder="// type your commands here..."
                value={draftContent}
                readOnly={isReadOnly}
                onChange={(e) => {
                    if (isReadOnly) return;
                    playType();
                    setDraftContent(e.target.value);
                }}
                className={`h-full w-full resize-none bg-transparent p-8 font-mono text-base leading-relaxed text-terminal-text outline-none placeholder:text-terminal-muted custom-scrollbar ${isReadOnly ? 'cursor-default opacity-80' : ''}`}
            />

            {error && (
                <div className="absolute bottom-0 w-full border-t border-red-500/50 bg-red-500/20 px-6 py-3 font-mono text-sm text-red-400 backdrop-blur-md">
                    CRITICAL ERROR: {error}
                </div>
            )}
        </motion.div>
    );
}
