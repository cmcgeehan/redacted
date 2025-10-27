import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'spy-red': '#DC143C',
        'spy-dark': '#0A0A0A',
      },
      fontFamily: {
        'mono': ['var(--font-share-tech)', 'Courier New', 'monospace'],
        'tech': ['var(--font-orbitron)', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 0.5s infinite',
        'flicker': 'flicker 2s infinite',
        'typewriter': 'typewriter 3s steps(40) forwards',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}
export default config
