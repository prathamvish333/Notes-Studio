'use client';

import './globals.css';
import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();

  const handleCloseClick = () => {
    // If we're an app running over the dashboard, go back to dashboard.
    // If we're already on dashboard, closing implies logout (going to login).
    if (pathname === '/dashboard') {
      window.localStorage.removeItem('token');
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  };

  const showTopPanel = pathname !== '/dashboard' && pathname !== '/login';

  return (
    <html lang="en">
      <body className="bg-background text-terminal-text antialiased">
        <SoundProvider>
          <AnimatedBackground />

          <div className="flex min-h-screen flex-col">
            {/* Top Panel / Terminal Header */}
            {showTopPanel && (
              <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-terminal-green/20 bg-terminal-board/80 px-6 py-3 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  {/* Linux Terminal Dots */}
                  <div className="flex gap-1.5 group">
                    <div
                      onClick={handleCloseClick}
                      className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)] cursor-pointer hover:bg-red-500 flex items-center justify-center transition-all"
                    >
                      <span className="text-[8px] text-black opacity-0 group-hover:opacity-100 leading-none pb-[1px]">x</span>
                    </div>
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
                  <div className="font-mono text-xs text-terminal-green">
                    [SECURE_CONNECTION_ESTABLISHED]
                  </div>
                </div>
              </header>
            )}

            {/* Main Content Area */}
            <main className={`flex-1 ${showTopPanel ? 'pt-14' : ''}`}>
              {children}
            </main>

            {/* Matrix Scanline Effect Overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
          </div>
        </SoundProvider>
      </body>
    </html>
  );
}
