/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#f9a428", // "#",
					light: "#fcd294",
					dark: "#7d5214",
					50: "#fef6ea",
					100: "#fde4bf",
					200: "#fcd294",
					300: "#fbc87e",
					400: "#fbbf69",
					500: "#faad3e",
					600: "#e09424",
					700: "#c78320",
					800: "#ae731c",
					900: "#956218",
				},
				background: {
					DEFAULT: "#E6E8F1",
					light: "#FFFFFF",
					dark: "#F1F5F9",
				},
				text: {
					DEFAULT: "#2D3D45",
					light: "#4A6979",
					dark: "#414141",
				},
			},
		},
		screens: {
			xs: "375px",
			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
	important: true,
};
