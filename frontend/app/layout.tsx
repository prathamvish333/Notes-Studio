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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background-light text-slate-900 antialiased dark:bg-background-dark dark:text-slate-100">
        <div className="flex min-h-screen flex-col">
          <header className="flex items-center justify-between border-b border-slate-200/70 bg-surface-light/80 px-6 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-surface-dark/80">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-xl bg-gradient-to-tr from-slate-900 via-slate-600 to-slate-300 shadow-sm dark:from-slate-100 dark:via-slate-500 dark:to-slate-900" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight">Notes Studio</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Crafted by Pratham Vishwakarma
                </span>
              </div>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}

