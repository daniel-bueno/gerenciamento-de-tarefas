/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-87": 'rgba(255, 255, 255, 0.87)',
      },
    },
  },
  plugins: [],
}