'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const chapters = [
  { section: 'hero',      number: 'I',   title: 'The Beginning',  color: '#60a5fa' },
  { section: 'about',     number: 'II',  title: 'The Student',    color: '#a78bfa' },
  { section: 'projects',  number: 'III', title: 'The Builder',    color: '#c084fc' },
  { section: 'skills',    number: 'IV',  title: 'The Growth',     color: '#34d399' },
  { section: 'ai-vision', number: 'V',   title: 'The Future',     color: '#f472b6' },
  { section: 'contact',   number: 'VI',  title: 'The Final Scene',color: '#fbbf24' },
];

export default function CinematicOverlay({ activeSection }) {
  const [visible, setVisible] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(null);
  const prevSection = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Skip on first mount (hero)
    if (prevSection.current === null) {
      prevSection.current = activeSection;
      return;
    }
    if (activeSection === prevSection.current) return;
    prevSection.current = activeSection;

    const chapter = chapters.find((c) => c.section === activeSection);
    if (!chapter) return;

    // Clear any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    setCurrentChapter(chapter);
    setVisible(true);

    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, 2200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeSection]);

  return (
    <>

      {/* Chapter transition card */}
      <AnimatePresence>
        {visible && currentChapter && (
          <motion.div
            key={currentChapter.section}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Letterbox bars */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-black"
              initial={{ height: 0 }}
              animate={{ height: '4vh' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-black"
              initial={{ height: 0 }}
              animate={{ height: '4vh' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Chapter card */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p
                className="text-xs font-mono tracking-[0.4em] uppercase mb-2"
                style={{ color: currentChapter.color }}
              >
                Chapter {currentChapter.number}
              </p>
              <p className="text-2xl font-light text-white tracking-widest italic">
                {currentChapter.title}
              </p>
              <motion.div
                className="mx-auto mt-3 h-px w-0"
                animate={{ width: '120px' }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{ background: `linear-gradient(90deg, transparent, ${currentChapter.color}, transparent)` }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
