import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/lib/svelte/**/*.{js,ts,jsx,tsx,svelte}",
    "./src/App.svelte",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // https://tailwindcss.com/docs/adding-custom-styles#adding-custom-utilities
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities({
        ".font-heading": {
          fontFamily: `"Luckiest Guy", cursive`,
        },
        ".max-w-screen-fhd": {
          maxWidth: "1920px",
        },
        ".m-0-auto": {
          margin: "0 auto",
        },
      });
    }),
  ],
};
