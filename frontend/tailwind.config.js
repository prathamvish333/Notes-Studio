/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0a0a0a',
        terminal: {
          green: '#00ff41',
          cyan: '#00ffff',
          board: '#111111',
          dim: '#1a1a1a',
          text: '#e0e0e0',
          muted: '#808080'
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'terminal-glow': '0 0 15px rgba(0, 255, 65, 0.05)',
        'terminal-glow-hover': '0 0 10px rgba(0, 255, 65, 0.2)',
      }
    },
  },
  plugins: [],
};

