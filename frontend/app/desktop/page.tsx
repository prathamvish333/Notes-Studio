'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DesktopRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/prathams-os');
    }, [router]);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-black font-mono text-terminal-green">
            <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-terminal-green border-t-transparent" />
                <p>Redirecting to Pratham's OS...</p>
                <p className="text-[10px] text-gray-600 uppercase tracking-widest">Route Migration in Progress</p>
            </div>
        </div>
    );
}
