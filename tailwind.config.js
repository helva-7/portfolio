/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        paper: '#f3ead7',
        'paper-dark': '#d8c6a5',
        red: '#e23b2e',
        yellow: '#f0c541',
        'muted-blue': '#426a9f',
      },
      fontFamily: {
        display: ['Bebas Neue', 'Anton', 'Oswald', 'Impact', 'Haettenschweiler', 'sans-serif'],
        comic: ['Bangers', 'Permanent Marker', 'Impact', 'Haettenschweiler', 'sans-serif'],
        body: ['Inter', 'Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1200px',
      },
      boxShadow: {
        manga: '10px 10px 0 #111111',
        'manga-red': '10px 10px 0 #e23b2e',
        'manga-yellow': '10px 10px 0 #f0c541',
      },
      keyframes: {
        'panel-reveal': {
          '0%': { opacity: '0', transform: 'translateY(60px) rotate(-1deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(0deg)' },
        },
        'word-pop': {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(10px)' },
          '50%': { opacity: '1', transform: 'scale(1.05) translateY(-2px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'bubble-in': {
          '0%': { opacity: '0', transform: 'scale(0.5) rotate(-5deg)' },
          '60%': { opacity: '1', transform: 'scale(1.05) rotate(1deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        'drift-slow': {
          '0%': { transform: 'translateX(-20px)' },
          '100%': { transform: 'translateX(20px)' },
        },
        'panel-slide': {
          '0%': { opacity: '0', transform: 'translateX(-80px) rotate(-2deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) rotate(0deg)' },
        },
      },
      animation: {
        'panel-reveal': 'panel-reveal 0.8s ease-out both',
        'word-pop': 'word-pop 0.6s ease-out both',
        'bubble-in': 'bubble-in 0.5s ease-out both',
        'drift-slow': 'drift-slow 8s ease-in-out infinite alternate',
        'panel-slide': 'panel-slide 0.8s ease-out both',
      },
    },
  },
  plugins: [],
};
