import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF7F2',
        linen: '#F3EAE1',
        blush: '#E9D3CA',
        ink: '#24161B',
        wine: { DEFAULT: '#6B1D38', deep: '#3A0F1F', soft: '#8A3352' },
        gold: { DEFAULT: '#B38B4F', light: '#D9BE8C', deep: '#86622C' },
        muted: '#6E5A60',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"Jost Variable"', 'system-ui', '-apple-system', '"Segoe UI"', '"Nirmala UI"', 'Roboto', 'sans-serif'],
      },
      maxWidth: { page: '76rem' },
      letterSpacing: { eyebrow: '0.22em' },
    },
  },
  plugins: [],
} satisfies Config;
