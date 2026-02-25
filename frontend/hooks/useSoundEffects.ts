'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useSoundContext } from '../context/SoundContext';

type AudioContextType = InstanceType<typeof window.AudioContext> | null;

export function useSoundEffects() {
    const audioCtxRef = useRef<AudioContextType>(null);
    const { isMuted } = useSoundContext();

    const initAudio = useCallback(() => {
        if (!audioCtxRef.current && typeof window !== 'undefined') {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current?.state === 'suspended') {
            audioCtxRef.current.resume();
        }
    }, []);

    const playBlip = useCallback(() => {
        if (isMuted) return;
        initAudio();
        const ctx = audioCtxRef.current;
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }, [initAudio]);

    const playType = useCallback(() => {
        if (isMuted) return;
        initAudio();
        const ctx = audioCtxRef.current;
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // A short noise/click sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200 + Math.random() * 200, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    }, [initAudio]);

    const playBoot = useCallback(() => {
        if (isMuted) return;
        initAudio();
        const ctx = audioCtxRef.current;
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(50, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.5);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 1.0);

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.5);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.0);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.0);
    }, [initAudio]);

    return { playBlip, playType, playBoot, initAudio };
}
