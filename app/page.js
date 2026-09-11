'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';
import HeroOverlay from '@/components/HeroOverlay';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import AIVisionSection from '@/components/AIVisionSection';
import ContactSection from '@/components/ContactSection';
import PriyaAssistant from '@/components/PriyaAssistant';
import NavigationBar from '@/components/NavigationBar';
import SoundManager from '@/components/SoundManager';
import ParticleField from '@/components/ParticleField';
import CommandPalette from '@/components/CommandPalette';
import FloatingQuickActions from '@/components/FloatingQuickActions';

const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => null,
});

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'ai-vision', 'contact'];

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [commandOpen, setCommandOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const sectionsRef = useRef({});

  // Initialize theme from localStorage / system preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tp_portfolio_theme');
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
        document.documentElement.classList.toggle('light', saved === 'light');
        document.documentElement.classList.toggle('dark', saved === 'dark');
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } catch {
      // fallback
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('tp_portfolio_theme', next);
      } catch {
        // no-op
      }
      document.documentElement.classList.toggle('light', next === 'light');
      document.documentElement.classList.toggle('dark', next === 'dark');
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse & touch parallax tracking
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      setMousePos({ x, y });
    };

    const handleDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.min(Math.max(e.gamma / 30, -1), 1);
        const y = Math.min(Math.max((e.beta - 45) / 30, -1), 1);
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  // RequestAnimationFrame scroll progress tracker
  useEffect(() => {
    let rafId;
    let lastScrollTop = -1;

    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const scrollTop = el.scrollTop;
        if (scrollTop !== lastScrollTop) {
          lastScrollTop = scrollTop;
          const scrollHeight = el.scrollHeight - el.clientHeight;
          const progress = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
          setScrollProgress(progress);

          const threshold = el.clientHeight * 0.4;
          let currentSection = SECTION_IDS[0];
          for (const id of SECTION_IDS) {
            const section = sectionsRef.current[id];
            if (section && section.offsetTop <= scrollTop + threshold) {
              currentSection = id;
            }
          }
          setActiveSection(currentSection);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const scrollToSection = useCallback((id) => {
    const section = sectionsRef.current[id];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const registerSection = useCallback((id, el) => {
    if (el) sectionsRef.current[id] = el;
  }, []);

  if (loading) return <LoadingScreen onFinish={() => setLoading(false)} />;

  return (
    <div className={`relative w-full h-screen overflow-hidden ${theme === 'light' ? 'bg-slate-50' : 'bg-black'}`}>
      {/* 3D Fixed Background World */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene3D scrollProgress={scrollProgress} mousePos={mousePos} theme={theme} />
      </div>

      {/* Subtle particle canvas */}
      <ParticleField scrollProgress={scrollProgress} />

      {/* Navigation Header */}
      <NavigationBar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCommand={() => setCommandOpen(true)}
      />

      {/* Scrollable Content Container */}
      <div
        ref={containerRef}
        className="relative z-10 h-screen overflow-y-auto cinematic-scroll [scroll-behavior:smooth] md:[scroll-snap-type:y_proximity]"
      >
        {/* Hero */}
        <section
          ref={(el) => registerSection('hero', el)}
          className="relative min-h-screen flex items-center justify-center md:[scroll-snap-align:start]"
        >
          <HeroOverlay scrollProgress={scrollProgress} />
        </section>

        {/* About */}
        <section
          ref={(el) => registerSection('about', el)}
          className="relative min-h-screen md:[scroll-snap-align:start]"
        >
          <AboutSection />
        </section>

        {/* Projects */}
        <section
          ref={(el) => registerSection('projects', el)}
          className="relative min-h-screen md:[scroll-snap-align:start]"
        >
          <ProjectsSection />
        </section>

        {/* Skills */}
        <section
          ref={(el) => registerSection('skills', el)}
          className="relative min-h-screen md:[scroll-snap-align:start]"
        >
          <SkillsSection />
        </section>

        {/* AI Vision */}
        <section
          ref={(el) => registerSection('ai-vision', el)}
          className="relative min-h-screen md:[scroll-snap-align:start]"
        >
          <AIVisionSection />
        </section>

        {/* Contact */}
        <section
          ref={(el) => registerSection('contact', el)}
          className="relative min-h-screen md:[scroll-snap-align:start]"
        >
          <ContactSection />
        </section>
      </div>

      {/* Floating Back to Top & Quick Actions */}
      <FloatingQuickActions
        scrollProgress={scrollProgress}
        onScrollToTop={() => scrollToSection('hero')}
        onOpenCommand={() => setCommandOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Command Palette / Spotlight Search */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onNavigate={scrollToSection}
        onOpenPriya={() => {
          const btn = document.querySelector('[aria-label="Open AI Assistant"]');
          if (btn) btn.click();
        }}
      />

      {/* Priya AI Assistant */}
      <PriyaAssistant onNavigate={scrollToSection} />

      {/* Web Audio Sound Manager */}
      <SoundManager
        enabled={soundEnabled}
        scrollProgress={scrollProgress}
        activeSection={activeSection}
      />
    </div>
  );
}
