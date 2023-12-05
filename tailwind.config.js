/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["cupcake"],
  },
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'bg': '#F9F5FF',
        'primary': '#28262C',
        'secondary': '#998FC7',
        'accent': '#D4C2FC'

      }
    },
  },
}