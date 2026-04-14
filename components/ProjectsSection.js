'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Gamepad2, Bot, Globe, Database, ArrowRight, ShieldCheck, TrafficCone, Hotel, Sparkles } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Helmet Detection System',
    subtitle: 'AI & Computer Vision',
    description:
      'Advanced AI-based system that uses computer vision to detect riders without helmets in real-time. Implements CNN deep learning models with 95%+ accuracy for safety enforcement and traffic compliance.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Computer Vision', 'Deep Learning'],
    icon: ShieldCheck,
    color: 'blue',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accentColor: '#60a5fa',
    borderColor: 'border-blue-500/30',
    link: null,
    github: 'https://github.com/TejaPriyan',
    featured: true,
  },
  {
    id: 2,
    title: 'Smart Traffic Monitoring',
    subtitle: 'IoT & AI Platform',
    description:
      'IoT and AI-powered system for real-time traffic analysis, violation detection, and smart city infrastructure. Combines computer vision with IoT sensors using YOLO for intelligent traffic management.',
    tech: ['Python', 'IoT', 'YOLO', 'OpenCV', 'Real-time Processing'],
    icon: TrafficCone,
    color: 'purple',
    gradient: 'from-purple-500/20 to-pink-500/20',
    accentColor: '#c084fc',
    borderColor: 'border-purple-500/30',
    link: null,
    github: 'https://github.com/TejaPriyan',
    featured: true,
  },
  {
    id: 3,
    title: 'Hotel Booking Website',
    subtitle: 'Full-Stack Web Application',
    description:
      'Responsive full-stack hotel management system featuring room listings, real-time booking, user authentication, and admin dashboard. Built with Java Spring Boot and modern web technologies for seamless user experience.',
    tech: ['Java', 'Spring Boot', 'HTML/CSS', 'SQL', 'REST APIs'],
    icon: Hotel,
    color: 'green',
    gradient: 'from-green-500/20 to-emerald-500/20',
    accentColor: '#4ade80',
    borderColor: 'border-green-500/30',
    link: 'https://veltechhotel.onrender.com/',
    github: 'https://github.com/TejaPriyan',
    featured: false,
  },
  {
    id: 4,
    title: 'Gaming Hub Platform',
    subtitle: 'Interactive Web Games',
    description:
      'Collection of interactive games and web-based gaming experiences. A fun, engaging platform showcasing frontend creativity, interactive UI design, and JavaScript game mechanics.',
    tech: ['JavaScript', 'HTML/CSS', 'Interactive UI', 'Game Design'],
    icon: Gamepad2,
    color: 'cyan',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    accentColor: '#22d3ee',
    borderColor: 'border-cyan-500/30',
    link: 'https://tejagamehub.netlify.app/',
    github: 'https://github.com/TejaPriyan',
    featured: false,
  },
  {
    id: 5,
    title: 'Glass\u2011Tech Sanctuary',
    subtitle: 'Personal Web App & Gaming Hub',
    description:
      'A serene, glass-inspired personal portfolio & gaming hub. Explore Mind & Skill Suite games, medical & anatomy trivia, and clean code snippets — all wrapped in a minimalist, glassmorphism aesthetic.',
    tech: ['HTML/CSS', 'JavaScript', 'Game Design', 'Glassmorphism', 'Interactive'],
    icon: Sparkles,
    color: 'pink',
    gradient: 'from-pink-500/20 to-rose-500/20',
    accentColor: '#ec4899',
    borderColor: 'border-pink-500/30',
    link: 'https://myself-tejapriyan.onrender.com/',
    github: 'https://github.com/TejaPriyan',
    featured: false,
  },
  {
    id: 6,
    title: '3D Scroll Portfolio Experience',
    subtitle: 'Immersive Web Application',
    description:
      'This very portfolio — an immersive scroll-based 3D storytelling experience. An Apple-style cinematic journey built with Three.js, Next.js, and Framer Motion featuring scroll-driven camera transitions.',
    tech: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'WebGL'],
    icon: Globe,
    color: 'amber',
    gradient: 'from-amber-500/20 to-orange-500/20',
    accentColor: '#f59e0b',
    borderColor: 'border-amber-500/30',
    link: null,
    github: 'https://github.com/TejaPriyan',
    featured: false,
  },
];

const techColors = {
  Java: 'bg-orange-500/20 text-orange-300',
  'Spring Boot': 'bg-green-500/20 text-green-300',
  'Spring Cloud': 'bg-green-500/20 text-green-300',
  React: 'bg-cyan-500/20 text-cyan-300',
  'Next.js': 'bg-white/10 text-white',
  'Node.js': 'bg-green-500/20 text-green-300',
  Express: 'bg-gray-500/20 text-gray-300',
  Python: 'bg-yellow-500/20 text-yellow-300',
  TensorFlow: 'bg-orange-500/20 text-orange-300',
  OpenCV: 'bg-blue-500/20 text-blue-300',
  'Computer Vision': 'bg-purple-500/20 text-purple-300',
  'Deep Learning': 'bg-pink-500/20 text-pink-300',
  IoT: 'bg-teal-500/20 text-teal-300',
  YOLO: 'bg-red-500/20 text-red-300',
  'Real-time Processing': 'bg-amber-500/20 text-amber-300',
  'HTML/CSS': 'bg-orange-500/20 text-orange-300',
  SQL: 'bg-blue-500/20 text-blue-300',
  'REST APIs': 'bg-green-500/20 text-green-300',
  'Interactive UI': 'bg-purple-500/20 text-purple-300',
  'Game Design': 'bg-pink-500/20 text-pink-300',
  Glassmorphism: 'bg-cyan-500/20 text-cyan-300',
  Interactive: 'bg-violet-500/20 text-violet-300',
  JavaScript: 'bg-yellow-500/20 text-yellow-300',
  PostgreSQL: 'bg-blue-500/20 text-blue-300',
  MongoDB: 'bg-green-500/20 text-green-300',
  Redis: 'bg-red-500/20 text-red-300',
  WebSocket: 'bg-purple-500/20 text-purple-300',
  Docker: 'bg-blue-500/20 text-blue-300',
  Kubernetes: 'bg-blue-500/20 text-blue-300',
  'Three.js': 'bg-white/10 text-white',
  'Framer Motion': 'bg-pink-500/20 text-pink-300',
  'Tailwind CSS': 'bg-cyan-500/20 text-cyan-300',
  WebGL: 'bg-red-500/20 text-red-300',
};

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.7, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.01 : 1})`,
        transition: 'transform 0.25s ease',
        transformStyle: 'preserve-3d',
      }}
      className={`group relative rounded-2xl glass overflow-hidden
                  border border-white/5 hover:${project.borderColor}
                  transition-colors duration-500 ${project.featured ? 'md:col-span-2' : ''}`}
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0
                       group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Accent glow bar at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
      />

      <div className="relative p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.gradient}
                            flex items-center justify-center`}>
              <project.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="text-xs text-gray-400 font-mono">{project.subtitle}</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 leading-relaxed mb-6">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`px-2 py-1 rounded-md text-xs font-mono ${techColors[t] || 'bg-gray-500/20 text-gray-300'}`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* View project arrow */}
        <motion.div
          className="mt-6 flex items-center gap-2 text-sm text-gray-400 group-hover:text-blue-400 transition-colors"
          animate={hovered ? { x: 5 } : { x: 0 }}
        >
          <span>View Project</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-purple-400 tracking-wider uppercase">Projects</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What I&apos;ve
            </span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Built
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From AI-powered vision systems to full-stack web apps — each project represents a real-world challenge solved with clean code and innovative design.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}