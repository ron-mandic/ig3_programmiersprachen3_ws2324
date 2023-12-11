import plugin from "tailwindcss/plugin";
import tailwindUtilities from "./src/lib/js/tailwind.utilities.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,js,jsx,tsx,svelte}"],
  theme: {
    extend: {},
  },
  plugins: [
    // https://tailwindcss.com/docs/adding-custom-styles#writing-plugins
    plugin(function ({ addUtilities }) {
      addUtilities(tailwindUtilities);
    }),
  ],
};
