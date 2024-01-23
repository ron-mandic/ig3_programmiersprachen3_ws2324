import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
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
			},
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
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

export default config;