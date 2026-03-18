'use client';

import { ReactNode } from 'react';
import { OSProvider } from '../context/OSContext';
import { SoundProvider } from '../context/SoundContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <OSProvider>
      <SoundProvider>
        {children}
      </SoundProvider>
    </OSProvider>
  );
}
