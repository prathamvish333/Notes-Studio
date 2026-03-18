'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type SystemState = 'booting' | 'running' | 'shutting_down' | 'restarting';

interface OSContextType {
    systemState: SystemState;
    setSystemState: (state: SystemState) => void;
    triggerShutdown: () => void;
    triggerRestart: () => void;
    completeBoot: () => void;
    isRecruiterMode: boolean;
    setRecruiterMode: (mode: boolean) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
    const [systemState, setSystemState] = useState<SystemState>('booting');
    const [isRecruiterMode, setRecruiterMode] = useState(false);

    const triggerShutdown = () => setSystemState('shutting_down');
    const triggerRestart = () => setSystemState('restarting');
    const completeBoot = () => setSystemState('running');

    return (
        <OSContext.Provider value={{ 
            systemState, 
            setSystemState, 
            triggerShutdown, 
            triggerRestart, 
            completeBoot,
            isRecruiterMode,
            setRecruiterMode
        }}>
            {children}
        </OSContext.Provider>
    );
}

export function useOS() {
    const context = useContext(OSContext);
    if (!context) {
        throw new Error('useOS must be used within an OSProvider');
    }
    return context;
}
