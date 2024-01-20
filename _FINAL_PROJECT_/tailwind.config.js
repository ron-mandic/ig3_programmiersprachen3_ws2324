import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			// b
			backgroundColor: {},
			border: {},
			// m
			margin: {
				'0-auto': '0 auto'
			},
			maxWidth: {
				fhd: '1920px'
			}
		}
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			// addBase({
			// 	h1: {
			// 		fontSize: theme('fontSize.2xl')
			// 	},
			// 	h2: {
			// 		fontSize: theme('fontSize.xl')
			// 	}
			// });
			// addComponents({
			// 	'.card': {
			// 		backgroundColor: theme('colors.white'),
			// 		borderRadius: theme('borderRadius.lg'),
			// 		padding: theme('spacing.6'),
			// 		boxShadow: theme('boxShadow.xl')
			// 	}
			// });
			addUtilities({
				// '.content-visibility': {
				// 	containIntrinsicSize: '100px 200px',
				// 	contentVisibility: 'auto',
				// 	containment: 'layout paint'
				// }
				'.debug': {
					outline: '1px solid rgba(255, 0, 0, 0.5)'
				},
				'.frame': {
					width: '100%',
					height: 'auto',
					maxWidth: '1920px',
					margin: '0 auto'
				},
				'.mask': {
					overflow: 'hidden'
				}
			});
			// theme('contentVisibility', {
			// 	visible: 'visible',
			// 	hidden: 'hidden'
			// });
		})
	]
};
