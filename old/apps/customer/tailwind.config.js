/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wafi: {
          50: '#f3f0ff',
          100: '#e9e3ff',
          200: '#d5cbff',
          300: '#b5a1ff',
          400: '#9b6fff',
          500: '#8b3dff',
          600: '#7c1aff',
          700: '#6d0eef',
          800: '#5b0ec8',
          900: '#4c10a3',
          950: '#2d066f',
        },
        dark: '#32373c',
        surface: '#f8f9fb',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
      },
      keyframes: {
        'stamp-pop': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'confetti-burst': {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1.5) rotate(180deg)', opacity: '0' },
        },
        'card-complete': {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.02)' },
          '50%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        'scan-line': {
          '0%': { top: '10%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '90%', opacity: '0' },
        },
      },
      animation: {
        'stamp-pop': 'stamp-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'confetti-burst': 'confetti-burst 0.6s ease-out forwards',
        'card-complete': 'card-complete 0.5s ease-in-out',
        'scan-line': 'scan-line 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
