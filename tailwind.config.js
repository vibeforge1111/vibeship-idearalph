/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      // IdeaRalph Crayon Design System
      colors: {
        'ralph-yellow': '#FFD93D',
        'playground-green': '#6BCB77',
        'crayon-red': '#FF6B6B',
        'sky-blue': '#4D96FF',
        'chalkboard': '#2D3436',
        'paper': '#FFF9E6',
        'paper-dark': '#2D3436',
        // Sportrail Design System (official brand)
        'sport': {
          'red': '#ff2a2a',
          'gold': '#ffbb00',
          'blue': '#1e73be',
          'primary': '#ff2a2a',
          'secondary': '#000000',
          'accent': '#ffbb00',
          'light': '#f6f6f6',
          'dark': '#000000',
          'gray': {
            50: '#f6f6f6',
            100: '#eeeeee',
            200: '#d5d5d5',
            300: '#b0b0b0',
            400: '#8a8a8a',
            500: '#6b6b6b',
            600: '#555555',
            700: '#454545',
            800: '#333333',
            900: '#212529',
          }
        },
      },
      fontFamily: {
        'chalk': ['Fredoka One', 'cursive'],
        'handwritten': ['Patrick Hand', 'cursive'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'sport-heading': ['Poppins', 'system-ui', 'sans-serif'],
        'sport-body': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pop': 'pop 0.3s ease-out',
        'scribble': 'scribble 0.5s ease-in-out',
        'swing': 'swing 1s ease-in-out infinite',
        'think': 'think 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pop: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '80%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scribble: {
          '0%': { strokeDasharray: '0 1000' },
          '100%': { strokeDasharray: '1000 0' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        think: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      boxShadow: {
        'crayon': '4px 4px 0px #2D3436',
        'crayon-lg': '6px 6px 0px #2D3436',
      },
      borderRadius: {
        'wobbly': '30% 70% 70% 30% / 30% 30% 70% 70%',
      },
    },
  },
  plugins: [],
};
