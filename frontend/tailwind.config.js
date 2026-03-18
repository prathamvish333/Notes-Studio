/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0b1120',
        surface: '#111827',
        'surface-card': '#1e293b',
        terminal: {
          green: '#0d9488', // Replaced with Teal Primary
          teal: '#0d9488',
          'teal-hover': '#14b8a6',
          'teal-glow': '#2dd4bf',
          'teal-muted': '#134e4a',
          board: '#0b1120',
          dim: '#111827',
          text: '#e5e7eb',
          muted: '#9ca3af'
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
        'terminal-glow': '0 0 15px rgba(13, 148, 136, 0.1)',
        'terminal-glow-hover': '0 0 20px rgba(20, 184, 166, 0.3)',
        'teal-glow': '0 0 20px rgba(13, 148, 136, 0.2)',
      }
    },
  },
  plugins: [],
};

