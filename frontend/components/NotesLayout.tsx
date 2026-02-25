'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type User = {
  id: number;
  email: string;
  full_name?: string | null;
};

export default function NotesLayout() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const token =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('token')
      : null;

  const authHeaders = token
    ? {
      Authorization: `Bearer ${token}`,
    }
    : {};

  const loadNotes = async () => {
    if (!token) {
      router.push('/login');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<Note[]>(`${API_BASE_URL}/notes/`, {
        headers: authHeaders,
      });
      const data = res.data;
      setNotes(data);
      if (data.length > 0) {
        const first = data[0];
        setSelectedId(first.id);
        setDraftTitle(first.title);
        setDraftContent(first.content);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.detail || 'Failed to load notes. Please retry.';
      setError(message);
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedUser = window.localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
    if (!token) {
      router.push('/login');
      return;
    }
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectNote = (note: Note) => {
    setSelectedId(note.id);
    setDraftTitle(note.title);
    setDraftContent(note.content);
  };

  const handleCreate = async () => {
    if (!token) return;
    setSaving(true);
    setError(null);
    try {
      const res = await axios.post<Note>(
        `${API_BASE_URL}/notes/`,
        {
          title: 'Untitled',
          content: '',
        },
        { headers: authHeaders }
      );
      const created = res.data;
      setNotes((prev) => [created, ...prev]);
      setSelectedId(created.id);
      setDraftTitle(created.title);
      setDraftContent(created.content);
    } catch (err: any) {
      const message =
        err.response?.data?.detail || 'Could not create note. Please try again.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!token || selectedId === null) return;
    setSaving(true);
    setError(null);
    try {
      const res = await axios.put<Note>(
        `${API_BASE_URL}/notes/${selectedId}`,
        {
          title: draftTitle,
          content: draftContent,
        },
        { headers: authHeaders }
      );
      const updated = res.data;
      setNotes((prev) =>
        prev.map((n) => (n.id === updated.id ? updated : n))
      );
    } catch (err: any) {
      const message =
        err.response?.data?.detail || 'Could not save note. Please try again.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!token || selectedId === null) return;
    setSaving(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/notes/${selectedId}`, {
        headers: authHeaders,
      });
      setNotes((prev) => prev.filter((n) => n.id !== selectedId));
      const remaining = notes.filter((n) => n.id !== selectedId);
      if (remaining.length > 0) {
        const first = remaining[0];
        setSelectedId(first.id);
        setDraftTitle(first.title);
        setDraftContent(first.content);
      } else {
        setSelectedId(null);
        setDraftTitle('');
        setDraftContent('');
      }
    } catch (err: any) {
      const message =
        err.response?.data?.detail ||
        'Could not delete note. Please try again.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
    }
    router.push('/login');
  };

  const selectedNote = notes.find((n) => n.id === selectedId) || null;

  return (
    <div className="flex h-[calc(100vh-80px)] w-full gap-4">
      {/* Sidebar: Library */}
      <aside className="terminal-panel flex w-56 flex-col p-4">
        <div className="mb-6 font-mono text-xs uppercase tracking-widest text-terminal-cyan">
          drwxr-xr-x library
        </div>

        <button
          onClick={handleCreate}
          disabled={saving}
          className="mb-4 flex items-center justify-center gap-2 rounded-md border border-terminal-green/40 bg-terminal-green/10 py-2 font-mono text-xs font-bold text-terminal-green transition-all hover:bg-terminal-green/20 focus:outline-none focus:ring-1 focus:ring-terminal-green disabled:opacity-50"
        >
          <span>+</span>
          <span>touch new_note.txt</span>
        </button>

        <div className="mt-auto space-y-2 border-t border-terminal-dim pt-4 font-mono text-xs text-terminal-muted">
          <div className="flex items-center gap-2 text-terminal-text">
            <span className="h-2 w-2 rounded-full bg-terminal-green shadow-[0_0_5px_#00ff41]"></span>
            <span className="truncate">{user ? user.full_name || user.email : 'guest@local'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 hover:underline"
          >
            exit
          </button>
        </div>
      </aside>

      {/* Note List */}
      <section className="terminal-panel flex w-80 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-terminal-dim bg-terminal-dim/30 px-4 py-3 font-mono text-xs text-terminal-text">
          <span>~/notes</span>
          <span className="text-terminal-cyan">[{notes.length} total]</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex h-full animate-pulse items-center justify-center text-xs text-terminal-muted">
              loading blocks...
            </div>
          ) : notes.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center text-xs text-terminal-muted">
              Directory is empty.
            </div>
          ) : (
            <ul className="divide-y divide-terminal-dim">
              {notes.map((note) => (
                <li key={note.id}>
                  <button
                    onClick={() => selectNote(note)}
                    className={`block w-full px-4 py-3 text-left transition-colors ${selectedId === note.id
                        ? 'border-l-2 border-terminal-green bg-terminal-dim text-terminal-green'
                        : 'border-l-2 border-transparent hover:bg-terminal-dim/50 hover:text-terminal-text text-terminal-muted'
                      }`}
                  >
                    <div className="font-mono text-xs font-bold uppercase tracking-tight">
                      {note.title || 'untitled.md'}
                    </div>
                    <div className="mt-1 line-clamp-2 font-mono text-[10px] opacity-70">
                      {note.content || '/* empty */'}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Editor */}
      <section className="terminal-panel flex flex-1 flex-col overflow-hidden relative">
        <div className="flex items-center justify-between border-b border-terminal-dim bg-terminal-dim/30 px-4 py-3">
          <input
            type="text"
            placeholder="filename.md"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            className="w-full bg-transparent font-mono text-sm font-bold text-terminal-cyan outline-none placeholder:text-terminal-muted"
          />
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={!selectedNote || saving}
              className="rounded border border-red-500/30 px-3 py-1 font-mono text-xs text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
            >
              rm
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedNote || saving}
              className="rounded bg-terminal-green px-4 py-1 font-mono text-xs font-bold text-background transition hover:bg-[#00cc33] disabled:opacity-70 shadow-[0_0_10px_rgba(0,255,65,0.4)]"
            >
              {saving ? 'saving...' : ':wq'}
            </button>
          </div>
        </div>

        <textarea
          placeholder="> type your commands here..."
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          className="h-full w-full resize-none bg-transparent p-5 font-mono text-sm leading-relaxed text-terminal-text outline-none placeholder:text-terminal-muted"
        />

        {error && (
          <div className="absolute bottom-0 w-full border-t border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-400 backdrop-blur-sm">
            ERROR: {error}
          </div>
        )}
      </section>
    </div>
  );
}

