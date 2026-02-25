'use client';

import './globals.css';
import { ReactNode } from 'react';
import { SoundProvider, useSoundContext } from '../context/SoundContext';
import AnimatedBackground from '../components/AnimatedBackground';

function VolumeToggle() {
  const { isMuted, toggleMute } = useSoundContext();

  return (
    <button
      onClick={toggleMute}
      className="font-mono text-xs text-terminal-muted transition-colors hover:text-terminal-green"
    >
      [{isMuted ? '🔇 AUDIO: OFF' : '🔊 AUDIO: ON'}]
    </button>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-terminal-text antialiased">
        <SoundProvider>
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
                  <span className="text-sm font-bold tracking-tight text-terminal-green">notes-studio</span>
                  <span className="text-xs text-terminal-muted">~/projects/pratham</span>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-4">
                <VolumeToggle />
              </div>
            </header>

            <main className="flex-1 pt-12">
              {children}
            </main>
          </div>
        </SoundProvider>
      </body>
    </html>
  );
}
