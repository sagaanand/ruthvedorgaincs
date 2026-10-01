/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F6F3',
          100: '#E4ECE6',
          200: '#C7D9CC',
          300: '#9FBDA7',
          400: '#6E9A7B',
          500: '#4A7C59',
          600: '#3A6346',
          700: '#2E4F38',
          800: '#244532', // Primary Brand
          900: '#1A3325',
          950: '#0F1E16',
        },
        ivory: {
          50: '#FAF8F3',
          100: '#F6F2E8', // Background
          200: '#ECE3D1',
          300: '#DFD1B6',
          400: '#CFBB97',
        },
        gold: {
          50: '#FAF6EF',
          100: '#F4ECE1',
          200: '#E8D7BE',
          300: '#DCBE96',
          400: '#CFA86F',
          500: '#C49A60', // Accent
          600: '#A77D44',
          700: '#846034',
        },
        dark: {
          900: '#1C1F1D',
          800: '#2A2E2B',
          700: '#424844',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Poppins"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(36, 69, 50, 0.06)',
        'premium': '0 12px 35px -4px rgba(36, 69, 50, 0.12)',
        'elevated': '0 20px 45px -8px rgba(36, 69, 50, 0.16)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
}
