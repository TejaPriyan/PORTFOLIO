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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  // Mouse parallax tracking
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;  // -1 to +1
      const y = -((e.clientY / window.innerHeight) * 2 - 1); // -1 to +1 (inverted)
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Use rAF polling instead of scroll event for bullet-proof detection
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

          // Use actual section offsets to find active section
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

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative w-full h-screen">
      {/* 3D Background - Fixed cinematic world */}
      <div className="fixed inset-0 z-0">
        <Scene3D scrollProgress={scrollProgress} mousePos={mousePos} />
      </div>

      {/* Particle overlay (reduced) */}
      <ParticleField scrollProgress={scrollProgress} />

      {/* Navigation */}
      <NavigationBar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />



      {/* Scrollable content */}
      <div
        ref={containerRef}
        className="relative z-10 h-screen overflow-y-auto cinematic-scroll"
        style={{ scrollSnapType: 'y proximity' }}
      >
        {/* Hero */}
        <section
          ref={(el) => registerSection('hero', el)}
          className="relative min-h-screen flex items-center justify-center"
          style={{ scrollSnapAlign: 'start' }}
        >
          <HeroOverlay scrollProgress={scrollProgress} />
        </section>

        {/* About */}
        <section
          ref={(el) => registerSection('about', el)}
          className="relative min-h-screen"
          style={{ scrollSnapAlign: 'start' }}
        >
          <AboutSection />
        </section>

        {/* Projects */}
        <section
          ref={(el) => registerSection('projects', el)}
          className="relative min-h-screen"
          style={{ scrollSnapAlign: 'start' }}
        >
          <ProjectsSection />
        </section>

        {/* Skills */}
        <section
          ref={(el) => registerSection('skills', el)}
          className="relative min-h-screen"
          style={{ scrollSnapAlign: 'start' }}
        >
          <SkillsSection />
        </section>

        {/* AI Vision */}
        <section
          ref={(el) => registerSection('ai-vision', el)}
          className="relative min-h-screen"
          style={{ scrollSnapAlign: 'start' }}
        >
          <AIVisionSection />
        </section>

        {/* Contact */}
        <section
          ref={(el) => registerSection('contact', el)}
          className="relative min-h-screen"
          style={{ scrollSnapAlign: 'start' }}
        >
          <ContactSection />
        </section>
      </div>

      {/* Priya AI Assistant */}
      <PriyaAssistant onNavigate={scrollToSection} />

      {/* Sound Manager */}
      <SoundManager
        enabled={soundEnabled}
        scrollProgress={scrollProgress}
        activeSection={activeSection}
      />
    </div>
  );
}