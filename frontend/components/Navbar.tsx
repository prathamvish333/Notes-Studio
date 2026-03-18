'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useOS } from '../context/OSContext';

const navItems = [
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Engineering', href: '/engineering' },
  { name: 'Notes Demo', href: '/notes' },
];

export default function Navbar() {
  const { isRecruiterMode, setRecruiterMode } = useOS();
  const { scrollY } = useScroll();
  const [activeSegment, setActiveSegment] = useState('');
  
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.9)']
  );
  
  const navPadding = useTransform(
    scrollY,
    [0, 100],
    ['1.5rem', '1rem']
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['experience', 'projects', 'skills'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSegment(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav
      style={{
        backgroundColor: navBg,
        paddingTop: navPadding,
        paddingBottom: navPadding,
      }}
      className="fixed top-0 inset-x-0 z-50 nav-blur px-6 md:px-20 lg:px-32 flex items-center justify-between transition-colors duration-300"
    >
      <Link href="/" className="font-heading text-lg font-black tracking-tighter text-[#e5e7eb]">
        PRATHAM<span className="text-[#0d9488]">.</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link ${activeSegment === item.href.replace('#', '') ? 'active' : ''} transition-colors duration-200`}
          >
            {item.name}
          </Link>
        ))}

        <button
          onClick={() => setRecruiterMode(!isRecruiterMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-heading text-[10px] font-black tracking-widest uppercase transition-all border duration-300
            ${isRecruiterMode 
              ? 'bg-[#0d9488] border-[#0d9488] text-white shadow-[0_0_20px_rgba(13,148,136,0.3)]' 
              : 'border-white/10 text-[#9ca3af] hover:text-[#e5e7eb] hover:border-[#0d9488]/30 shadow-none'}`}
        >
          <div className={`w-2 h-2 rounded-full ${isRecruiterMode ? 'bg-white animate-pulse' : 'bg-gray-600'} transition-all`} />
          {isRecruiterMode ? 'Recruiter_Active' : 'Recruiter Mode'}
        </button>

        <a
          href="/Prathams_Resume.pdf"
          download
          className="px-4 py-2 bg-white/5 hover:bg-[#0d9488]/10 border border-white/10 hover:border-[#0d9488]/30 rounded-lg font-heading text-[10px] font-bold tracking-[0.2em] uppercase transition-all text-[#9ca3af] hover:text-[#e5e7eb]"
        >
          Resume
        </a>
      </div>

      {/* Mobile Actions */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={toggleMenu}
          className="p-2 text-[#e5e7eb] hover:bg-white/5 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-[70px] bg-[#0b1120]/98 backdrop-blur-2xl z-40 p-6 flex flex-col gap-8 md:hidden border-t border-white/5 shadow-2xl overflow-y-auto"
          >
            <div className="flex flex-col gap-6 pt-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center justify-between"
                  >
                    <span className="text-3xl font-heading font-black text-[#e5e7eb] uppercase tracking-tighter group-hover:text-[#0d9488] transition-colors">
                      {item.name}
                    </span>
                    <div className="w-8 h-[1px] bg-white/10 group-hover:bg-[#0d9488] group-hover:w-12 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pb-20 border-t border-white/5 pt-8 flex flex-col gap-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  setRecruiterMode(!isRecruiterMode);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full px-6 py-5 rounded-2xl font-heading text-[10px] font-black tracking-widest uppercase transition-all border
                  ${isRecruiterMode ? 'bg-[#0d9488] border-[#0d9488] text-white shadow-[0_10px_30px_rgba(13,148,136,0.3)]' : 'border-white/10 text-[#9ca3af]'}`}
              >
                <span>Recruiter Mode</span>
                <div className={`w-2 h-2 rounded-full ${isRecruiterMode ? 'bg-white animate-pulse' : 'bg-gray-600'}`} />
              </motion.button>
              
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href="/Prathams_Resume.pdf"
                download
                className="flex items-center justify-center w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-heading text-[10px] font-black tracking-widest uppercase text-[#e5e7eb] transition-all"
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
