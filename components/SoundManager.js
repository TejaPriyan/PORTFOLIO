'use client';

import { useEffect, useRef, useCallback } from 'react';

// Web Audio API sound manager — no external audio files needed
export default function SoundManager({ enabled, scrollProgress, activeSection }) {
  const audioCtxRef = useRef(null);
  const prevSectionRef = useRef(null);

  const getContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  // Atmospheric hum
  const playHum = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 60;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.5);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 3);
    } catch (e) {
      // AudioContext may not be available
    }
  }, [enabled, getContext]);

  // Section transition blip
  const playTransition = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Silent fail
    }
  }, [enabled, getContext]);

  // Watch section changes
  useEffect(() => {
    if (activeSection !== prevSectionRef.current) {
      prevSectionRef.current = activeSection;
      playTransition();
    }
  }, [activeSection, playTransition]);

  // Initial ambient
  useEffect(() => {
    if (enabled) {
      const timer = setTimeout(playHum, 1000);
      return () => clearTimeout(timer);
    }
  }, [enabled, playHum]);

  // Add global click sound
  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e) => {
      if (e.target.closest('button') || e.target.closest('a')) {
        try {
          const ctx = getContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(600, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.05);
          gain.gain.setValueAtTime(0.03, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.08);
        } catch (e) {
          // Silent fail
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [enabled, getContext]);

  return null;
}