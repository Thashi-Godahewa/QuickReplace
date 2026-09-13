/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        brand: {
          blue: '#2563eb',
          blueHover: '#1d4ed8',
          navy: '#0f172a',
          dark: '#020617',
          card: '#f8fafc',
        },
      },
      boxShadow: {
        glass: '0 20px 40px -15px rgba(0, 0, 0, 0.25)',
        pill: '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
