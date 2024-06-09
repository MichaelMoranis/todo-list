/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "body-background": "url('/src/assets/body-background.jpg')"
      }
    },
  },
  plugins: [],
}

