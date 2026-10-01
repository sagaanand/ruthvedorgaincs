/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Logo Brand Saffron / Orange
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F37023', // Primary Logo Orange
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        // Logo Brand Leaf Green
        leaf: {
          50: '#F4F9EE',
          100: '#E7F4DC',
          200: '#CFEAB8',
          300: '#B0DC8E',
          400: '#91CB63',
          500: '#81BF4A', // Primary Logo Leaf Green
          600: '#649F30',
          700: '#4C7D24',
          800: '#38601C',
          900: '#264214',
          950: '#14250A',
        },
        // Primary deep green palette
        forest: {
          50: '#F4F8F3',
          100: '#E5EFE2',
          200: '#CBE0C6',
          300: '#A7CBA0',
          400: '#7EB174',
          500: '#5A9450',
          600: '#427639',
          700: '#325C2B',
          800: '#24451F', // Deep Botanical Green
          900: '#183115',
          950: '#0E1D0C',
        },
        // Background Cream / Warm Ivory
        ivory: {
          50: '#FCFBF8',
          100: '#FAF7F0',
          200: '#F3ECE0',
          300: '#E7DCB6',
          400: '#D5C498',
        },
        // Logo Sun Gold Accent
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F8A61B', // Logo Sun Gold
          600: '#D97706',
          700: '#B45309',
        },
        // Deep Charcoal for crisp contrast
        dark: {
          900: '#181C17',
          800: '#252B24',
          700: '#3A4238',
          600: '#525B4F',
          500: '#6D776A',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Poppins"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'soft': '0 2px 15px -3px rgba(36, 69, 31, 0.05), 0 4px 6px -2px rgba(36, 69, 31, 0.02)',
        'premium': '0 10px 30px -4px rgba(36, 69, 31, 0.08), 0 4px 10px -2px rgba(243, 112, 35, 0.05)',
        'elevated': '0 20px 45px -8px rgba(36, 69, 31, 0.14)',
        'glow-orange': '0 0 25px -5px rgba(243, 112, 35, 0.35)',
        'glow-green': '0 0 25px -5px rgba(129, 191, 74, 0.35)',
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
