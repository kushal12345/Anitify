/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          light: '#ffffff',
          DEFAULT: '#ffffff',
          dark: '#ffffff',
        },
        secondary: {
          light: '#ffed4a',
          DEFAULT: '#f7dc6f',
          dark: '#ffd700',
        },
        // Neutral colors
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e5e5ea',
          400: '#cacaca',
          500: '#a8a8a8',
          600: '#666666',
          700: '#454545',
          750: '#393939',
          800: '#333333',
          900: '#222222',
        },
        // Background colors
        background: {
          light: '#f7fafc',
          DEFAULT: '#ffffff',
          dark: '#000000',
          red:'#FF0000',
        },
        // Text colors
        text: {
          light: '#333333',
          DEFAULT: '#666666',
          dark: '#999999',
        },
        // Accent colors
        accent: {
          red: '#ff69b4',
          orange: '#ffa07a',
          yellow: '#ffff00',
          green: '#33cc33',
          blue: '#0066ff',
          indigo: '#4b0082',
          violet: '#7a288a',
        },
      },
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px (default)
      lg: '1.125rem', // 18px
      xl: '1.25rem',
      xxl: '1.225rem',
      xxxl: '1.325rem', // 20px
    },
    
  },
  plugins: [],
}

