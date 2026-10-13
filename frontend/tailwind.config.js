/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#c0272d',
          redHover: '#a71e24',
          redDark: '#8a181c',
          redLight: '#fef2f2',
          redGlow: '#e51d25',
          black: '#0c0d10',
          darkSurface: '#121418',
          darkCard: '#1a1d24',
          offWhite: '#fdfdfc',
          subtleGray: '#f8f9fa',
          border: '#e5e7eb',
          muted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['"Kumbh Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'red-glow': '0 0 20px -3px rgba(192, 39, 45, 0.35)',
        'red-sm': '0 0 10px rgba(192, 39, 45, 0.2)'
      }
    },
  },
  plugins: [],
}
