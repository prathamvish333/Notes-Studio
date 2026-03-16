'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SoundProvider, useSoundContext } from '../context/SoundContext';
import { OSProvider, useOS } from '../context/OSContext';
import AnimatedBackground from '../components/AnimatedBackground';
import BootSequence from './BootSequence';
import DevTerminal from './DevTerminal';

function SystemWrapper({ children }: { children: React.ReactNode }) {
  const { systemState, completeBoot } = useOS();
  const [bootMode, setBootMode] = useState<'boot' | 'shutdown' | 'restart'>('boot');

  useEffect(() => {
    if (systemState === 'shutting_down') setBootMode('shutdown');
    if (systemState === 'restarting') setBootMode('restart');
  }, [systemState]);

  return (
    <BootSequence 
      mode={bootMode} 
      onComplete={completeBoot}
    >
      {children}
    </BootSequence>
  );
}

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

export default function ClientLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Robust navigation guard
    const token = window.localStorage.getItem('token');
    // Notes are publicly viewable; only settings requires auth
    const isRestrictedPath = pathname === '/settings';
    
    if (!token && isRestrictedPath) {
      router.push('/login');
    }
  }, [pathname, router]);

  const handleCloseClick = () => {
    router.push('/');
  };

  const [isWindowMode, setIsWindowMode] = useState(false);
  const [isRecursive, setIsRecursive] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const inWindow = searchParams.get('window') === 'true' || window.self !== window.top;
    setIsWindowMode(inWindow);

    // Recursion check: If we are in an iframe and trying to load the dashboard again
    const isIframe = window.self !== window.top;
    if (isIframe && pathname === '/') {
      setIsRecursive(true);
    }
  }, [pathname]);

  if (isRecursive) return null; // Prevent windows inside windows

  const showTopPanel = pathname !== '/' && pathname !== '/desktop' && pathname !== '/login' && pathname !== '/signup' && !isWindowMode;

  return (
    <OSProvider>
      <SoundProvider>
        <SystemWrapper>
          {!isWindowMode && <AnimatedBackground />}

          <div className={`flex min-h-screen flex-col ${isWindowMode ? 'bg-black/40 backdrop-blur-md' : 'bg-transparent'}`}>
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

            {/* Developer Terminal (Ctrl + `) */}
            <DevTerminal />
          </div>
        </SystemWrapper>
      </SoundProvider>
    </OSProvider>
  );
}
