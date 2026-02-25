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
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <div className="terminal-panel w-full max-w-md overflow-hidden relative">
        {/* Terminal Header Bar */}
        <div className="flex items-center gap-2 border-b border-terminal-dim bg-terminal-dim/30 px-4 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-terminal-green/80"></div>
          <span className="ml-2 font-mono text-[10px] text-terminal-muted">bash - login</span>
        </div>

        <div className="px-8 py-8">
          <div className="mb-6 flex flex-col items-center">
            <span className="text-4xl">💻</span>
            <h1 className="mt-4 font-mono text-xl font-bold tracking-tight text-terminal-green">
              AUTH_REQUIRED
            </h1>
            <p className="mt-2 font-mono text-xs text-terminal-muted">
              Enter credentials to access secure terminal.
            </p>
          </div>

          {error && (
            <div className="mb-6 border-l-2 border-red-500 bg-red-500/10 p-3 font-mono text-xs text-red-400">
              [ERROR]: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-terminal-cyan">
                Username (Email)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="terminal-input"
                placeholder="user@system.local"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-terminal-cyan">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="terminal-input tracking-widest"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="terminal-btn mt-6"
            >
              <span className="mr-2">&gt;</span>
              {loading ? 'AUTHENTICATING...' : 'EXECUTE_LOGIN'}
            </button>
          </form>

          <div className="mt-8 border-t border-terminal-dim pt-6 text-center">
            <p className="font-mono text-[10px] text-terminal-muted">
              Unidentified user?{' '}
              <button
                type="button"
                onClick={() => router.push('/signup')}
                className="text-terminal-cyan underline-offset-4 hover:underline"
              >
                Request Access
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

