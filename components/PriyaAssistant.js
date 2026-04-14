'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Download, FolderOpen, Mail, ChevronRight,
  Sparkles, Terminal, Bot, User,
} from 'lucide-react';

const quickActions = [
  { id: 'resume', icon: Download, label: 'Download Resume', color: 'blue' },
  { id: 'projects', icon: FolderOpen, label: 'View Projects', color: 'purple' },
  { id: 'contact', icon: Mail, label: 'Contact Teja', color: 'green' },
  { id: 'about', icon: User, label: 'About Teja', color: 'cyan' },
];

const knowledgeBase = {
  greeting: `Hey there! 👋 I'm **Priya**, Teja's digital portfolio guide. I can help you navigate this portfolio, learn about Teja's work, or point you to his resume. What would you like to know?`,
  about: `**Teja Priyan** is a Computer Science graduate (May 2025) and Full Stack Developer with 2+ years of hands-on experience:\n\n• **Java & Spring Boot** — Enterprise backend development, REST APIs, microservices\n• **Computer Vision** — Helmet detection, number plate recognition, traffic monitoring\n• **Full-Stack Development** — React, Next.js, HTML/CSS, Tailwind\n• **AI & Machine Learning** — TensorFlow, OpenCV, YOLO, deep learning\n\nHe completed a 6-month Java Full Stack Developer training (Sep 2025 – Mar 2026) and speaks English, Tamil, and Telugu.`,
  skills: `Teja's core skills include:\n\n🔹 **Languages:** Java (95%), Python (85%), JavaScript (88%), HTML/CSS, SQL\n🔹 **Frontend:** React, Next.js, Tailwind CSS, Three.js, Responsive Design\n🔹 **Backend:** Spring Boot, Spring Security, REST APIs, MySQL, PostgreSQL, MongoDB\n🔹 **AI/CV:** OpenCV, TensorFlow, YOLO, Deep Learning, Computer Vision\n🔹 **Tools:** Git/GitHub, Docker, Maven, VS Code, Postman`,
  projects: `Teja has built impressive real-world projects:\n\n🛡️ **Helmet Detection System** — AI-based real-time helmet detection with 95%+ accuracy using OpenCV & TensorFlow\n🚦 **Smart Traffic Monitoring** — IoT + YOLO powered traffic analysis and violation detection\n🏨 **Hotel Booking Website** — Full-stack booking system with Spring Boot (Live: veltechhotel.onrender.com)\n🎮 **Gaming Hub Platform** — Interactive web games collection (Live: tejagamehub.netlify.app)\n✨ **Glass-Tech Sanctuary** — Glassmorphism gaming & trivia hub (Live: myself-tejapriyan.onrender.com)\n🌐 **3D Portfolio** — This immersive Three.js + Next.js cinematic experience`,
  ai: `Teja is deeply passionate about AI and Computer Vision. His real-world experience includes:\n\n• Built a **Helmet Detection System** with CNNs achieving **95%+ accuracy**\n• Created **Smart Traffic Monitoring** combining IoT sensors with YOLO\n• Implemented real-time **object detection** and **number plate recognition**\n• Working with **TensorFlow**, **OpenCV**, and **deep learning** models\n\nHe believes AI will transform every industry and is actively building AI-powered solutions.`,
  contact: `You can reach Teja through:\n\n📧 **Email:** tejapriyan@email.com\n💼 **LinkedIn:** linkedin.com/in/tejapriyan\n🐙 **GitHub:** github.com/TejaPriyan\n🐦 **Twitter:** twitter.com/tejapriyan\n\nOr use the contact form on this portfolio!`,
  resume: `You can download Teja's resume directly:\n\n📄 [Click here to download](/resume.pdf)\n\nIt includes his education (B.Sc Computer Science, GPA 8.5/10), Java Full Stack training, AI/CV project details, and certifications including Java Full Stack Developer Certification (2026).`,
  education: `Teja's education journey:\n\n🎓 **Bachelor of Computer Science** — Completed May 2025 (GPA: 8.5/10)\n💼 **Java Full Stack Developer Training** — Professional Training Institute (Sep 2025 – Mar 2026)\n🏆 **Certifications:** Java Full Stack Developer Certification (2026), Computer Vision & Deep Learning Specialist`,
  default: `I'm not sure about that specific topic, but I can help you with:\n\n• **About Teja** — Who he is and what he does\n• **Skills** — His technical expertise\n• **Projects** — What he's built\n• **AI Vision** — His thoughts on AI & the future\n• **Education** — Degrees and certifications\n• **Contact** — How to reach him\n• **Resume** — Download his CV\n\nJust ask!`,
};

function parseResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return knowledgeBase.greeting;
  if (lower.includes('about') || lower.includes('who') || lower.includes('teja')) return knowledgeBase.about;
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack') || lower.includes('know')) return knowledgeBase.skills;
  if (lower.includes('project') || lower.includes('built') || lower.includes('work') || lower.includes('portfolio')) return knowledgeBase.projects;
  if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('artificial') || lower.includes('future') || lower.includes('vision') || lower.includes('computer vision')) return knowledgeBase.ai;
  if (lower.includes('contact') || lower.includes('reach') || lower.includes('email') || lower.includes('hire')) return knowledgeBase.contact;
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) return knowledgeBase.resume;
  if (lower.includes('education') || lower.includes('degree') || lower.includes('certif') || lower.includes('training') || lower.includes('college') || lower.includes('university')) return knowledgeBase.education;
  return knowledgeBase.default;
}

export default function PriyaAssistant({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'priya', text: knowledgeBase.greeting, time: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Pulse animation for the fab
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input.trim(), time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = parseResponse(userMsg.text);
      setMessages((prev) => [...prev, { role: 'priya', text: response, time: new Date() }]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  }, [input]);

  const handleQuickAction = useCallback((id) => {
    switch (id) {
      case 'resume':
        window.open('/resume.pdf', '_blank');
        setMessages((prev) => [...prev,
          { role: 'user', text: 'Download Resume', time: new Date() },
          { role: 'priya', text: knowledgeBase.resume, time: new Date() },
        ]);
        break;
      case 'projects':
        onNavigate?.('projects');
        setMessages((prev) => [...prev,
          { role: 'user', text: 'View Projects', time: new Date() },
          { role: 'priya', text: 'Scrolling to the projects section! 🚀', time: new Date() },
        ]);
        setIsOpen(false);
        break;
      case 'contact':
        onNavigate?.('contact');
        setMessages((prev) => [...prev,
          { role: 'user', text: 'Contact Teja', time: new Date() },
          { role: 'priya', text: 'Taking you to the contact section! ✉️', time: new Date() },
        ]);
        setIsOpen(false);
        break;
      case 'about':
        onNavigate?.('about');
        setMessages((prev) => [...prev,
          { role: 'user', text: 'About Teja', time: new Date() },
          { role: 'priya', text: knowledgeBase.about, time: new Date() },
        ]);
        break;
      default:
        break;
    }
  }, [onNavigate]);

  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-300">$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* FAB Button */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setShowPulse(false); }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
                   bg-gradient-to-br from-blue-500 to-purple-600 text-white
                   shadow-lg shadow-blue-500/30 flex items-center justify-center
                   hover:shadow-blue-500/50 transition-shadow duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {showPulse && !isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-blue-400"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px]
                       rounded-2xl glass-dark overflow-hidden flex flex-col
                       shadow-2xl shadow-black/50 border border-blue-500/10"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3 bg-black/30">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500
                             flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                  Priya
                  <Sparkles className="w-3 h-3 text-purple-400" />
                </p>
                <p className="text-[10px] text-gray-500 font-mono">Teja&apos;s Digital Guide • Online</p>
              </div>
              <div className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-gray-600" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-3 py-2 border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                             bg-white/5 hover:bg-white/10 text-xs text-gray-400
                             hover:text-white transition-all duration-200 whitespace-nowrap
                             border border-white/5"
                >
                  <action.icon className="w-3 h-3" />
                  {action.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px] max-h-[320px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed
                               ${msg.role === 'user'
                                 ? 'bg-blue-500/20 text-blue-100 rounded-br-sm'
                                 : 'bg-white/5 text-gray-300 rounded-bl-sm border border-white/5'
                               }`}
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                  />
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-white/5 border border-white/5">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-blue-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/5 bg-black/20">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Priya anything..."
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10
                             text-sm text-white placeholder-gray-600
                             focus:outline-none focus:border-blue-500/30 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400
                             hover:bg-blue-500/30 disabled:opacity-30
                             transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}