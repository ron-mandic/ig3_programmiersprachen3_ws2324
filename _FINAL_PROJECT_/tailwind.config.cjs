/** @type {import('tailwindcss').Config}*/

// see https://www.shadcn-svelte.com/docs/installation#configure-tailwindconfigjs
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: []
};

module.exports = config;
