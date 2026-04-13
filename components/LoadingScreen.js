'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing systems...');

  useEffect(() => {
    const messages = [
      'Initializing systems...',
      'Loading 3D assets...',
      'Mapping star coordinates...',
      'Rendering Earth...',
      'Booting Priya AI...',
      'Ready for launch.',
    ];

    let i = 0;
    const interval = setInterval(() => {
      i++;
      const p = Math.min((i / 25) * 100, 100);
      setProgress(p);
      const msgIdx = Math.min(Math.floor(i / 5), messages.length - 1);
      setStatusText(messages[msgIdx]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <div className="flex flex-col items-center gap-8">
        {/* Orbital rings */}
        <div className="relative w-28 h-28">
          <motion.div
            className="absolute inset-0 border-2 border-transparent border-t-blue-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 border-2 border-transparent border-t-purple-400 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-4 border-2 border-transparent border-t-cyan-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-2xl font-bold text-blue-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              TP
            </motion.span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #a78bfa, #06b6d4)',
                width: `${progress}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500 font-mono">{statusText}</span>
            <span className="text-xs text-blue-400 font-mono">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Name */}
        <motion.p
          className="text-sm text-gray-600 tracking-[0.3em] uppercase"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Teja Priyan
        </motion.p>
      </div>
    </div>
  );
}