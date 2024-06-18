/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        orange: '#fc8019',
        darkblue: '#3060a8'
      }
    },
  },
  plugins: [],
}