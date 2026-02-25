'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type SoundContextType = {
    isMuted: boolean;
    toggleMute: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Load preference from localStorage
        const stored = localStorage.getItem('notes-studio-muted');
        if (stored === 'true') {
            setIsMuted(true);
        }
    }, []);

    const toggleMute = () => {
        setIsMuted((prev) => {
            const next = !prev;
            localStorage.setItem('notes-studio-muted', String(next));
            return next;
        });
    };

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSoundContext() {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error('useSoundContext must be used within a SoundProvider');
    }
    return context;
}
