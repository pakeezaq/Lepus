/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#f6f3ee',
        navy: '#1c2331',
        tweed: '#6b5f4b',
        olive: '#4a5a3c',
        camel: '#c2a77d',
        footer: '#ebe7df',
      },
      fontFamily: {
        'valetia': ['ValetiaScript', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

