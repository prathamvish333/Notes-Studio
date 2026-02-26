'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { useSoundEffects } from '../../hooks/useSoundEffects';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBoot, setShowBoot] = useState(false);
  const { playBlip, playType } = useSoundEffects();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playBlip();
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
      setShowBoot(true);
    } catch (err: any) {
      const message =
        err.response?.data?.detail || 'Unable to login. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (showBoot) {
    // We import BootSequence dynamically inside the file or at top
    const BootSequence = require('../../components/BootSequence').default;
    return (
      <BootSequence onComplete={() => router.push('/dashboard')}>
        <div />
      </BootSequence>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <div className="terminal-panel w-full max-w-2xl overflow-hidden relative shadow-2xl">
        {/* Terminal Header Bar */}
        <div className="flex items-center gap-2 border-b border-terminal-dim bg-terminal-dim/30 px-4 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-terminal-green/80"></div>
          <span className="ml-2 font-mono text-[10px] text-terminal-muted">system - login</span>
        </div>

        <div className="px-8 py-8 flex flex-col md:flex-row gap-8">

          {/* Profile Sidebar */}
          <div className="flex-1 md:border-r border-terminal-dim md:pr-8 flex flex-col">
            <h1 className="mt-4 font-mono text-2xl font-bold tracking-tight text-terminal-green uppercase">
              Pratham Vishwakarma
            </h1>
            <h2 className="text-sm font-mono text-terminal-cyan mb-6">
              Backend and DevOps Engineer
            </h2>

            <div className="w-full bg-black/40 border border-terminal-dim/50 p-4 rounded font-mono text-[10px] text-terminal-muted/80 space-y-2 flex-grow">
              <p><span className="text-terminal-cyan">Scripting:</span> Python, Shell Script</p>
              <p><span className="text-terminal-cyan">Containers:</span> Docker, Kubernetes</p>
              <p><span className="text-terminal-cyan">Auto & Deploy:</span> Jenkins, Argo CD</p>
              <p><span className="text-terminal-cyan">Databases:</span> PostgreSQL, MySQL</p>
              <p><span className="text-terminal-cyan">VCS:</span> Git, GitHub, Azure Repos</p>
              <p><span className="text-terminal-cyan">Platform:</span> DevOps, AWS</p>
              <p><span className="text-terminal-cyan">Infra:</span> Terraform</p>
              <p><span className="text-terminal-cyan">Monitoring:</span> Grafana</p>
              <p><span className="text-terminal-cyan">OS:</span> Linux</p>
              <p><span className="text-terminal-cyan">Architecture:</span> Microservices, Event</p>
            </div>
          </div>

          {/* Login Form Area */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-6 flex flex-col">
              <h3 className="font-mono text-lg font-bold tracking-tight text-terminal-green">
                SYSTEM_LOGIN
              </h3>
              <p className="mt-1 font-mono text-[10px] text-terminal-muted uppercase tracking-widest">
                Authenticate to proceed
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
                  onChange={(e) => { playType(); setEmail(e.target.value); }}
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
                  onChange={(e) => { playType(); setPassword(e.target.value); }}
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
                  onClick={() => { playBlip(); router.push('/signup'); }}
                  className="text-terminal-cyan underline-offset-4 hover:underline"
                >
                  Request Access
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

