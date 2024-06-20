/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poetsen: ['"Poetsen One"', ...defaultTheme.fontFamily.sans],
        'montserrat-alt': ['"Montserrat Alternates"', ...defaultTheme.fontFamily.sans],
        arsenal: ['"Arsenal"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        main: '#F0A40A',
        // 'main-hover': '#F0A40A',
        second: '#D2BC3C',
        thirdth: '#FFFFF5'

      }
    },
  },
  plugins: [],
}