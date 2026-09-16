/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep Sal Forest Green (Jharkhand Natural Colors)
        sal: {
          50: '#f2f9f4',
          100: '#e1f2e5',
          200: '#c3e5cb',
          300: '#99cfa7',
          400: '#69b17c',
          500: '#46955b',
          600: '#347746',
          700: '#2a5e38',
          800: '#234b2f',
          900: '#1d3e28',
          950: '#0d2215',
        },
        // Terracotta Red Earth (Chhotanagpur Red Soil)
        terracotta: {
          50: '#fdf6f3',
          100: '#fbe9e3',
          200: '#f7d6ca',
          300: '#eeaba2',
          400: '#e28073',
          500: '#d55a4a',
          600: '#c24233',
          700: '#a23427',
          800: '#862e24',
          900: '#6f2c23',
          950: '#3c130e',
        },
        // Harvest Ochre Yellow
        harvest: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        // Sohrai Art Cream Ivory
        ivory: {
          50: '#fdfbf7',
          100: '#f9f5eb',
          200: '#f2e8d5',
          300: '#e7d6b8',
          400: '#d7bc91',
        },
        // Tribal Turquoise Water
        tribal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        olchiki: ['Noto Sans Ol Chiki', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(29, 62, 40, 0.08)',
        'elevated': '0 10px 30px -5px rgba(29, 62, 40, 0.12)',
      }
    },
  },
  plugins: [],
}
