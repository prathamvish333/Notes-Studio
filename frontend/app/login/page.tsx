'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const data = res.data;
      window.localStorage.setItem('token', data.access_token);
      window.localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/');
    } catch (err: any) {
      const message =
        err.response?.data?.detail || 'Unable to login. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-gradient-to-b from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark">
      <div className="glass-panel w-full max-w-md px-8 py-10">
        <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="mb-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Sign in to continue writing thoughtful notes.
        </p>
        {error && (
          <div className="mb-4 rounded-md border border-red-300/70 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-700/70 dark:bg-red-950/50 dark:text-red-200">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
          New here?{' '}
          <button
            type="button"
            onClick={() => router.push('/signup')}
            className="font-medium text-slate-900 underline-offset-2 hover:underline dark:text-slate-100"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}

