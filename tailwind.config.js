/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          sky: '#01aee4',
          skyHover: '#0398c8',
          skySoft: '#eaf7fd',
          navy: '#001b33',
          navyLight: '#002f4b',
          footer: '#001324',
          ink: '#0b1a2e',
          muted: '#6d7c92',
          mist: '#f8fafc',
          line: '#e6ebf1',
        },
      },
      boxShadow: {
        card: '0 12px 32px -18px rgba(0, 27, 51, 0.25)',
        glow: '0 10px 30px -8px rgba(1, 174, 228, 0.6)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'marquee-reverse': { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee-reverse 60s linear infinite',
      },
    },
  },
  plugins: [],
}
