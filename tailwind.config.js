/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepSpaceBlack: '#0B0C10',
        lightGray: '#A3A3A3',
        astronautWhite: '#FFFFFF',
        metallicGray: '#4D4D4D',
        rocketRed: '#FF3B30',
        astralBlue: '#0077FF',
        galacticGold: '#FFD700',
      },
    },
  },
  plugins: [],
}

