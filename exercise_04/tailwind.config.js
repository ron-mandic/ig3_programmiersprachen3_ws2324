/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./**/*.{html,js}"],
	theme: {
		extend: {
			components: {
				".custom-border": {
					outline: "6px solid var(--clr-text__black)",
					outlineOffset: "-6px",
					borderRadius: "1.8125rem",
				},
			},
		},
	},
	plugins: [],
};
