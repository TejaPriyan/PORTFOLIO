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

const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => null,
});

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'ai-vision', 'contact'];

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const sectionsRef = useRef({});

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
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 3D Fixed Background World */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene3D scrollProgress={scrollProgress} mousePos={mousePos} />
      </div>

      {/* Subtle particle canvas */}
      <ParticleField scrollProgress={scrollProgress} />

      {/* Navigation Header */}
      <NavigationBar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
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
