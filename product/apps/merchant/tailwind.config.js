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
    },
  },
  plugins: [],
}
