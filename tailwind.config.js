/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        horizon: {
          50: '#fdf2f4',
          100: '#fbe6e9',
          200: '#f7ced4',
          600: '#b01022',
          700: '#980517', // Official Horizon Crimson
          800: '#780412',
          900: '#52020b',
        },
        neo: {
          bg: '#FBFBFA',
          dark: '#111827',
          yellow: '#FEF08A',
          red: '#FEE2E2',
          blue: '#E0F2FE',
          green: '#DCFCE7'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neo-sm': '3px 3px 0px 0px #111827',
        'neo': '4px 4px 0px 0px #111827',
        'neo-lg': '6px 6px 0px 0px #111827',
        'neo-red': '4px 4px 0px 0px #980517',
        'neo-red-lg': '6px 6px 0px 0px #980517',
      }
    }
  },
  plugins: [],
}
