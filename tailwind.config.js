/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Add all the file extensions you're using
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica'],
      },
    },
  },
  plugins: [],
}
