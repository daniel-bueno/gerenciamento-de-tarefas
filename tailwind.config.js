/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#242424',
        "white-87": 'rgba(255, 255, 255, 0.87)',
      },
    },
  },
  plugins: [],
}