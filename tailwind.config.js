import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
    "./resources/**/*.js",
  ],
  theme: {
    extend: {
        colors: {
            brand: {
                green: "#009975",
                blue: "#128E99",
                cyan: "#00C4D6",
            },
        },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

