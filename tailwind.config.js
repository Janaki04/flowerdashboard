/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This overrides the default 'font-sans' clean stack with Poppins project-wide
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}