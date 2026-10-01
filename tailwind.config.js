/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nature-Inspired Organic Palette
        forest: {
          DEFAULT: '#263F27',
          50: '#F4F7F4',
          100: '#E5EDE5',
          200: '#C7D9C7',
          300: '#A4C0A4',
          400: '#7FA37F',
          500: '#5F855F',
          600: '#466746',
          700: '#344F34',
          800: '#263F27', // Deep forest green
          900: '#1B2C1C',
          950: '#0F1A10',
        },
        olive: {
          DEFAULT: '#536B3F',
          50: '#F7F9F5',
          100: '#EDF2E8',
          200: '#DAE4D0',
          300: '#C1D2B2',
          400: '#A3BD8F',
          500: '#84A46C',
          600: '#698852',
          700: '#536B3F', // Olive green
          800: '#3F5230',
          900: '#2D3B23',
        },
        sage: {
          DEFAULT: '#A5AD89',
          50: '#F8F9F6',
          100: '#EFF1EA',
          200: '#DFE3D4',
          300: '#CBD1BB',
          400: '#B7BEA1',
          500: '#A5AD89', // Sage green
          600: '#8C956F',
          700: '#717A57',
          800: '#575E43',
          900: '#3E4330',
        },
        ivory: {
          DEFAULT: '#F7F1E4',
          50: '#FCFBF8',
          100: '#FAF7F0',
          200: '#F7F1E4', // Warm ivory
          300: '#EFE7D4',
          400: '#E4D6BC',
          500: '#D5C29F',
        },
        parchment: {
          DEFAULT: '#EDE2CB',
          50: '#FBF9F4',
          100: '#F7F3E9',
          200: '#EDE2CB', // Natural parchment
          300: '#DFD1B3',
          400: '#CEBC96',
          500: '#BCA477',
        },
        harvest: {
          DEFAULT: '#C6A16A',
          50: '#FAF6EE',
          100: '#F4EBDA',
          200: '#E9D6B3',
          300: '#DCBF8B',
          400: '#CFA867',
          500: '#C6A16A', // Harvest gold
          600: '#A9844B',
          700: '#866637',
          800: '#644B27',
        },
        earth: {
          DEFAULT: '#76573C',
          50: '#F8F5F2',
          100: '#EFE9E3',
          200: '#DFD3C6',
          300: '#CAB6A3',
          400: '#A58B74',
          500: '#886E56',
          600: '#76573C', // Earth brown
          700: '#5E442F',
          800: '#463222',
        },
        charcoal: {
          DEFAULT: '#282619',
          800: '#363426',
          900: '#282619',
          950: '#1A1810',
        },
        // Logo Brand Accents
        saffron: {
          500: '#F37023',
          600: '#EA580C',
        },
        leaf: {
          500: '#81BF4A',
          600: '#649F30',
        },
        gold: {
          500: '#C6A16A',
          600: '#B08C53',
        },
        dark: {
          900: '#282619',
          800: '#363426',
          700: '#4D4A39',
          600: '#6B6854',
          500: '#8A8671',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Poppins"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'soft': '0 2px 15px -3px rgba(38, 63, 39, 0.06), 0 4px 6px -2px rgba(38, 63, 39, 0.03)',
        'premium': '0 10px 30px -4px rgba(38, 63, 39, 0.1), 0 4px 10px -2px rgba(198, 161, 106, 0.08)',
        'elevated': '0 20px 45px -8px rgba(38, 63, 39, 0.16)',
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
