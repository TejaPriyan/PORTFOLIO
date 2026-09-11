'use client';

import { useEffect, useRef, useCallback } from 'react';

// Web Audio API synthesizer — zero external audio files needed
export default function SoundManager({ enabled, scrollProgress, activeSection }) {
  const audioCtxRef = useRef(null);
  const prevSectionRef = useRef(null);

  const getContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  // Atmospheric ambient hum
  const playHum = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getContext();
      if (!ctx || ctx.state !== 'running') return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 60;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.5);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 2.5);
    } catch {
      // AudioContext unavailable or blocked
    }
  }, [enabled, getContext]);

  // Section transition chime
  const playTransition = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getContext();
      if (!ctx || ctx.state !== 'running') return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Silent fail
    }
  }, [enabled, getContext]);

  // Trigger sound when active section shifts
  useEffect(() => {
    if (activeSection !== prevSectionRef.current) {
      prevSectionRef.current = activeSection;
      playTransition();
    }
  }, [activeSection, playTransition]);

  // Periodic ambient pulse when enabled
  useEffect(() => {
    if (enabled) {
      playHum();
    }
  }, [enabled, playHum]);

  // Subtle interactive UI click response
  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e) => {
      if (e.target.closest('button') || e.target.closest('a')) {
        try {
          const ctx = getContext();
          if (!ctx || ctx.state !== 'running') return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(520, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.05);
          gain.gain.setValueAtTime(0.02, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.07);
        } catch {
          // Silent fail
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [enabled, getContext]);

  return null;
}
