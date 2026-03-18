'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  help       — Show this message
  projects   — List projects
  skills     — Show technical skills
  resume     — Download resume
  github     — Open GitHub profile
  notes      — Open Notes Studio demo
  contact    — Show contact info
  api-status — Check API health
  os         — Launch Pratham's OS
  clear      — Clear terminal`,

  projects: `PROJECTS
─────────────────────
01  Notes Studio     Full-stack collaborative note platform
    Stack: Next.js • FastAPI • PostgreSQL • Docker • K8s
    URL:   https://prathamvishwakarma.com/notes

02  Interactive OS   Virtual desktop environment
    Stack: TypeScript • Framer Motion • Docker
    URL:   https://prathamvishwakarma.com/prathams-os`,

  os: `Booting Pratham's OS...`,

  skills: `SKILLS
─────────────────────
Languages   Python, Shell, TypeScript
Backend     FastAPI, REST APIs, SQLAlchemy, JWT
DevOps      Docker, Kubernetes, Terraform, CI/CD, Jenkins
Tools       Git, Linux, PostgreSQL, Prometheus, Grafana`,

  resume: `Opening resume download...`,

  github: `Opening https://github.com/prathamvish333 ...`,

  notes: `Opening Notes Studio demo...`,

  contact: `CONTACT
─────────────────────
Email     prathamvishwakarma2000@gmail.com
GitHub    github.com/prathamvish333
LinkedIn  linkedin.com/in/prathamvishwakarma
Website   prathamvishwakarma.com`,

  'api-status': `API STATUS
─────────────────────
Notes API:    ● Online
Latency:      ~120ms
Environment:  Production
Uptime:       99.9%
Last Deploy:  v42-portfolio-upgrade`,
};

export default function DevTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<{ input: string; output: string }[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === '`') {
      e.preventDefault();
      setIsOpen(prev => !prev);
    }
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    // Handle navigation commands
    if (cmd === 'resume') {
      window.open('/Prathams_Resume.pdf', '_blank');
    } else if (cmd === 'github') {
      window.open('https://github.com/prathamvish333', '_blank');
    } else if (cmd === 'notes') {
      window.location.href = '/notes';
    } else if (cmd === 'os') {
      window.location.href = '/prathams-os';
    }

    const output = COMMANDS[cmd] || `Command not found: ${cmd}. Type "help" for available commands.`;
    setHistory(prev => [...prev, { input: cmd, output }]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] w-[90vw] max-w-xl"
        >
          <div className="rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div onClick={() => setIsOpen(false)} className="h-3 w-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-[10px] text-gray-500">pratham@portfolio ~ %</span>
              </div>
              <span className="font-mono text-[9px] text-gray-700">Ctrl+` to toggle</span>
            </div>

            {/* Body */}
            <div ref={scrollRef} className="h-64 md:h-80 overflow-y-auto p-5 font-mono text-xs">
              <div className="text-gray-500 mb-4">
                Welcome to Pratham&apos;s terminal. Type &quot;help&quot; for commands.
              </div>
              {history.map((entry, i) => (
                <div key={i} className="mb-4">
                  <div className="flex gap-2">
                    <span className="text-terminal-teal shrink-0">❯</span>
                    <span className="text-[#e5e7eb]">{entry.input}</span>
                  </div>
                  <pre className="mt-1 ml-4 text-gray-400 whitespace-pre-wrap leading-relaxed">{entry.output}</pre>
                </div>
              ))}

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                <span className="text-terminal-teal shrink-0">❯</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[#e5e7eb] caret-terminal-teal"
                  placeholder="type a command..."
                  autoFocus
                />
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
