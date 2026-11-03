import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      colors: {
        nac: {
          navy: '#03142B',
          navy2: '#071E3A',
          gold: '#F8B817',
          blue: '#1499E6',
          /** AA-compliant blue for text and buttons on light backgrounds (5.4:1 on white). */
          'blue-ink': '#0B6FB0',
          cyan: '#17B8F2',
          magenta: '#E30A6D',
          ink: '#0D1B2A',
          mist: '#F4F7FB',
        },
      },
      boxShadow: {
        soft: '0 18px 55px rgba(3, 20, 43, 0.10)',
        card: '0 12px 30px rgba(3, 20, 43, 0.08)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top right, rgba(20,153,230,.28), transparent 38%), radial-gradient(circle at bottom left, rgba(248,184,23,.18), transparent 34%)',
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.04) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
