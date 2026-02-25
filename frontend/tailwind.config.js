/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f5f5f7',
          dark: '#000000',
        },
        surface: {
          light: '#ffffff',
          dark: '#111111',
        },
      },
    },
  },
  plugins: [],
};

