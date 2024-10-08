/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0056B3'
      },
      backgroundColor: {
        primary: '#0056B3'
      },
      fontFamily: {
        'roboto' : ["Roboto", "sans-serif"],
        'lato' : ["Lato", "sans-serif"],

      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

