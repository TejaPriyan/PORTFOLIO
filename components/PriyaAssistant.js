'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Download, FolderOpen, Mail, ChevronRight,
  Sparkles, Terminal, Bot, User, Cpu, ExternalLink
} from 'lucide-react';

const quickActions = [
  { id: 'ai-platform', icon: Sparkles, label: 'Teja Priyan AI', color: 'cyan' },
  { id: 'llm-model', icon: Cpu, label: 'Tejapriyan-8B Model', color: 'purple' },
  { id: 'resume', icon: Download, label: 'Resume', color: 'blue' },
  { id: 'contact', icon: Mail, label: 'Contact', color: 'green' },
];

const knowledgeBase = {
  greeting: `Hey there! 👋 I'm **Priya**, Teja's digital guide. I can help you explore his **AI platform**, **fine-tuned 8B model**, technical skills, or download his resume. What would you like to know?`,
  about: `**Teja Priyan** is an **AI Engineer & Full Stack Developer**:\n\n• **AI & LLM Fine-Tuning**: Fine-tuned **Tejapriyan-8B** for verifiable SQL reasoning and authored the **Teja Priyan AI** multimodal platform\n• **Computer Vision**: Real-time CNN helmet compliance (95%+ accuracy) and YOLO traffic monitoring\n• **Full-Stack Systems**: Next.js, React, Three.js, Java Spring Boot, FastAPI, and Tailwind CSS\n• **Education**: Bachelor of Computer Science (Completed May 2025, GPA 8.5/10) & Java Full Stack certification\n\nHe speaks English, Tamil, and Telugu.`,
  skills: `Teja's core technical toolkit:\n\n🚀 **AI & LLMs**: Fine-tuning (LoRA/QLoRA), PyTorch, Hugging Face, GGUF, Ollama, Multimodal AI, Prompt Engineering\n🎯 **Computer Vision**: OpenCV, YOLO (v8/v11), TensorFlow, CNNs, Deep Learning\n💻 **Languages**: Python, Java, JavaScript, TypeScript, SQL, HTML5/CSS3\n⚡ **Frontend & 3D**: React, Next.js, Three.js, WebGL, Framer Motion, Tailwind CSS\n🛠️ **Backend & Databases**: Spring Boot, FastAPI, PostgreSQL, MySQL, MongoDB, Docker, Git`,
  projects: `Teja's featured systems:\n\n🧠 **Teja Priyan AI Platform**: Multimodal AI workspace with live code execution, streaming, and vision reasoning ([Live Demo](https://tejapriyan-ai.vercel.app))\n⚡ **Tejapriyan-8B Model**: Fine-tuned 8B model for SQL reasoning ([Playground](https://tejapriyan-ai-model.vercel.app) | [Hugging Face](https://huggingface.co/teja161615/Tejapriyan-8B-GGUF))\n🪖 **Helmet Detection**: Real-time CV detection with 95%+ accuracy\n🚦 **Smart Traffic Monitoring**: Real-time IoT + YOLO analysis\n🏨 **Hotel Booking System**: Enterprise Spring Boot application\n🎮 **Gaming Hub**: HTML5 Canvas game arcade\n🌐 **3D Portfolio**: This Three.js + Next.js immersive storytelling site`,
  ai: `Teja specializes in applied AI engineering:\n\n• **Tejapriyan-8B**: 8-billion parameter fine-tuned model for verifiable Text-to-SQL logic, quantized to GGUF format for Ollama\n• **Teja Priyan AI**: High-throughput multimodal platform with live sandboxing\n• **Hugging Face**: Public model weights repository at huggingface.co/teja161615\n• **Edge Vision**: Real-time safety compliance models running with OpenCV and YOLO`,
  contact: `You can reach Teja directly at:\n\n📧 **Email**: teja1616150@gmail.com\n💼 **LinkedIn**: linkedin.com/in/tejapriyan\n💻 **GitHub**: github.com/TejaPriyan\n🤗 **Hugging Face**: huggingface.co/teja161615`,
  resume: `You can download Teja's resume right here:\n\n📄 [Download Resume PDF](/resume.pdf)\n\nIncludes his CS degree, full-stack certification, AI publications, and technical projects.`,
  education: `Teja's academic and training background:\n\n🎓 **Bachelor of Computer Science**: Completed May 2025 (GPA: 8.5/10)\n💼 **Java Full Stack Developer Training**: Professional Training Institute (Sep 2025 — Mar 2026)\n📜 **Certifications**: Java Full Stack Developer (2026), Computer Vision & Deep Learning Specialist`,
  default: `I can help you with:\n\n• **Teja Priyan AI** — His multimodal AI workspace\n• **Tejapriyan-8B** — His fine-tuned 8B model & Hugging Face weights\n• **Skills** — AI, LLMs, Computer Vision, Full Stack\n• **Resume** — Download his CV\n• **Contact** — How to email or connect with him\n\nWhat would you like to explore?`,
};

function parseResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return knowledgeBase.greeting;
  if (lower.includes('about') || lower.includes('who') || lower.includes('teja')) return knowledgeBase.about;
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack') || lower.includes('know')) return knowledgeBase.skills;
  if (lower.includes('project') || lower.includes('built') || lower.includes('work') || lower.includes('portfolio')) return knowledgeBase.projects;
  if (lower.includes('ai') || lower.includes('model') || lower.includes('8b') || lower.includes('llm') || lower.includes('hugging') || lower.includes('ollama')) return knowledgeBase.ai;
  if (lower.includes('contact') || lower.includes('reach') || lower.includes('email') || lower.includes('hire')) return knowledgeBase.contact;
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) return knowledgeBase.resume;
  if (lower.includes('education') || lower.includes('degree') || lower.includes('certif') || lower.includes('training') || lower.includes('college')) return knowledgeBase.education;
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
    }, 600 + Math.random() * 400);
  }, [input]);

  const handleQuickAction = useCallback((id) => {
    switch (id) {
      case 'ai-platform':
        window.open('https://tejapriyan-ai.vercel.app/', '_blank');
        setMessages((prev) => [
          ...prev,
          { role: 'user', text: 'Open Teja Priyan AI Platform', time: new Date() },
          { role: 'priya', text: 'Launching **Teja Priyan AI** in a new tab! 🚀 Multimodal workspace with live code execution and vision reasoning.', time: new Date() },
        ]);
        break;
      case 'llm-model':
        window.open('https://tejapriyan-ai-model.vercel.app/', '_blank');
        setMessages((prev) => [
          ...prev,
          { role: 'user', text: 'View Tejapriyan-8B Model', time: new Date() },
          { role: 'priya', text: 'Opening **Tejapriyan-8B Model & Playground**! ⚡ Fine-tuned 8B LLM for SQL reasoning. Weights also on Hugging Face.', time: new Date() },
        ]);
        break;
      case 'resume':
        window.open('/resume.pdf', '_blank');
        setMessages((prev) => [
          ...prev,
          { role: 'user', text: 'Download Resume', time: new Date() },
          { role: 'priya', text: knowledgeBase.resume, time: new Date() },
        ]);
        break;
      case 'contact':
        onNavigate?.('contact');
        setMessages((prev) => [
          ...prev,
          { role: 'user', text: 'Contact Teja', time: new Date() },
          { role: 'priya', text: 'Taking you to the contact section! ✨ You can send a message or email him directly.', time: new Date() },
        ]);
        setIsOpen(false);
        break;
      default:
        break;
    }
  }, [onNavigate]);

  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-300 font-semibold">$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-cyan-400 underline hover:text-cyan-200 font-medium">$1</a>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setShowPulse(false); }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
                   bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-white
                   shadow-xl shadow-cyan-500/25 flex items-center justify-center
                   hover:shadow-cyan-500/45 transition-all duration-300"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title="Chat with Priya, Portfolio AI Guide"
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

        {showPulse && !isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-cyan-400"
            animate={{ scale: [1, 1.45, 1.45], opacity: [0.7, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] max-h-[540px]
                       rounded-2xl glass-dark overflow-hidden flex flex-col
                       shadow-2xl shadow-black/80 border border-cyan-500/20"
          >
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600
                               flex items-center justify-center shadow-md shadow-cyan-500/20">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                    Priya AI
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono">Teja&apos;s Portfolio Guide · Active</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action Pills */}
            <div className="px-3 py-2.5 border-b border-white/10 flex gap-2 overflow-x-auto no-scrollbar bg-black/20">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full
                             bg-white/5 hover:bg-white/15 text-xs text-gray-300
                             hover:text-cyan-300 transition-all duration-200 whitespace-nowrap
                             border border-white/10 shrink-0 font-mono"
                >
                  <action.icon className="w-3 h-3 text-cyan-400" />
                  {action.label}
                </button>
              ))}
            </div>

            {/* Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px] max-h-[320px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed
                               ${msg.role === 'user'
                                 ? 'bg-cyan-500/20 text-cyan-100 rounded-br-sm border border-cyan-500/30'
                                 : 'bg-white/5 text-gray-200 rounded-bl-sm border border-white/10'
                               }`}
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                  />
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-white/5 border border-white/10">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="px-3 py-3 border-t border-white/10 bg-black/30">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Priya about Teja's AI, skills, projects..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10
                             text-xs text-white placeholder-gray-500
                             focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white
                             hover:from-cyan-400 hover:to-blue-500 disabled:opacity-30
                             transition-all duration-200 shadow-md shadow-cyan-500/20"
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
