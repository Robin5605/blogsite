/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nord: {
          100: '#2e3440',
          200: '#3b4252',
          300: '#434c5e',
          400: '#4c566a',
          500: '#d8dee9',
          600: '#e5e9f0',
          700: '#eceff4',
        },
        frost: {
          100: '#8fbcbb',
          200: '#88c0d0',
          300: '#81a1c1',
          400: '#5e81ac',
        }
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}