/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				mesh: 'url("/static/background.png")',
			},
			colors: {
				black: "#111827",
				white: {
					100: "#e5e7eb",
					DEFAULT: "#fff",
				},
				purple: {
					DEFAULT: "#4338ca",
					dark: "#4f46e5",
				},
			},
		},
	},
	plugins: [],
};

