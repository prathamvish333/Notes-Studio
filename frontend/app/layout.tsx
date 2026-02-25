'use client';

import './globals.css';
import { ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      document.documentElement.classList.toggle('dark', initial === 'dark');
    }
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      window.localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  };

  return [theme, toggle];
}

function ThemeToggle() {
  const [theme, toggle] = useTheme();

  return (
    <button
      onClick={toggle}
      className="rounded-full border border-slate-300/60 bg-surface-light px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-surface-dark dark:text-slate-200 dark:hover:bg-slate-800"
    >
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </button>
  );
}

import AnimatedBackground from '../components/AnimatedBackground';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-terminal-text antialiased">
        <AnimatedBackground />

        <div className="flex min-h-screen flex-col">
          {/* Top Panel / Terminal Header */}
          <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-terminal-green/20 bg-terminal-board/80 px-6 py-3 backdrop-blur-md">
            <div className="flex items-center gap-3">
              {/* Linux Terminal Dots */}
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
                <div className="h-3 w-3 rounded-full bg-terminal-green/80 shadow-[0_0_5px_rgba(0,255,65,0.5)]"></div>
              </div>

              <div className="ml-4 flex items-baseline gap-2 font-mono">
                <span className="text-sm font-bold text-terminal-green tracking-tight">notes-studio</span>
                <span className="text-xs text-terminal-muted">~/projects/pratham</span>
              </div>
            </div>
          </header>

          <main className="flex-1 pt-16">
            <div className="mx-auto max-w-5xl p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
