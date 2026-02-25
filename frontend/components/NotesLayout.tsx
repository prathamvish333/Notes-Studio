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
    <div className="flex h-[calc(100vh-56px)] flex-col bg-background-light dark:bg-background-dark">
      <div className="flex h-full gap-4 p-4">
        {/* Sidebar */}
        <aside className="glass-panel flex w-52 flex-col px-3 py-4">
          <div className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Library
          </div>
          <button
            onClick={handleCreate}
            disabled={saving}
            className="mb-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            New note
          </button>
          <div className="mt-auto space-y-1 text-xs text-slate-500 dark:text-slate-400">
            <div className="truncate">
              {user ? user.full_name || user.email : 'Guest'}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-slate-600 underline-offset-2 hover:underline dark:text-slate-300"
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* Notes list */}
        <section className="glass-panel flex w-72 flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200/70 px-3 py-2 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span>Notes</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              {notes.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex h-full items-center justify-center text-xs text-slate-500 dark:text-slate-400">
                Loading your notes…
              </div>
            ) : notes.length === 0 ? (
              <div className="flex h-full items-center justify-center px-4 text-center text-xs text-slate-500 dark:text-slate-400">
                No notes yet. Create your first one to get started.
              </div>
            ) : (
              <ul className="divide-y divide-slate-200/70 dark:divide-slate-800">
                {notes.map((note) => (
                  <li key={note.id}>
                    <button
                      type="button"
                      onClick={() => selectNote(note)}
                      className={`block w-full px-3 py-2 text-left text-xs transition ${
                        selectedId === note.id
                          ? 'bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate font-medium">
                          {note.title || 'Untitled'}
                        </span>
                      </div>
                      <p
                        className={`mt-1 line-clamp-2 text-[11px] ${
                          selectedId === note.id
                            ? 'text-slate-200 dark:text-slate-700'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {note.content || 'Empty note'}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Editor */}
        <section className="glass-panel flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3 dark:border-slate-800">
            <input
              type="text"
              placeholder="Title"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              className="mr-3 w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDelete}
                disabled={!selectedNote || saving}
                className="rounded-lg border border-slate-200/80 px-3 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!selectedNote || saving}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
          <textarea
            placeholder="Capture ideas, architecture notes, or interview talking points…"
            value={draftContent}
            onChange={(e) => setDraftContent(e.target.value)}
            className="h-full w-full resize-none bg-transparent px-4 py-3 text-sm leading-relaxed text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-600"
          />
          {error && (
            <div className="border-t border-slate-200/70 px-4 py-2 text-xs text-red-600 dark:border-slate-800 dark:text-red-300">
              {error}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

