/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#09090B',
          card: '#121215',
          cardHover: '#18181C',
          paper: '#FAFAFA',
          electric: '#0052FF',
          electricHover: '#1A66FF',
          muted: '#A1A1AA',
          border: '#27272A',
          lightBorder: '#E4E4E7',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'Syne', 'sans-serif'],
        body: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
        script: ['Caveat', 'Reenie Beanie', 'cursive'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
        'line-grid': "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        'electric-gradient': 'linear-gradient(135deg, #0052FF 0%, #00D1FF 100%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(18,18,21,0.8) 0%, rgba(9,9,11,1) 100%)',
      },
      boxShadow: {
        'electric': '0 0 25px rgba(0, 82, 255, 0.35)',
        'electric-lg': '0 0 50px rgba(0, 82, 255, 0.45)',
        'card-glow': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 82, 255, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
