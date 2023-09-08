import { createTheme } from "@mui/material";

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
		},
	},
	typography: {
		fontFamily: "Lexend,  sans-serif",
		// allVariants: {
		// 	color: "#000",
		// },
		button: {
			textTransform: "unset",
		},
	},
	palette: {
		primary: {
			main: "#f9a428",
			light: "#fcd294",
			dark: "#ae731c",
			100: "#fde4bf",
			200: "#fcd294",
			300: "#fbc87e",
			400: "#fbbf69",
			500: "#faad3e",
			600: "#e09424",
			700: "#c78320",
			800: "#ae731c",
			900: "#956218",
			contrastText: "#fff",
		},
		secondary: {
			main: "#475569",
			light: "#cbd5e1",
			dark: "#1e293b",
			100: "#f1f5f9",
			200: "#e2e8f0",
			300: "#cbd5e1",
			400: "#94a3b8",
			500: "#64748b",
			600: "#475569",
			700: "#334155",
			800: "#1e293b",
			900: "#0f172a",
			contrastText: "#fff",
		},
		success: {
			light: "#9bd99b",
			main: "#5ec25e",
			dark: "#36b336",
			contrastText: "#fff",
		},
		info: {
			main: "#ffffff",
			contrastText: "#401b60",
		},
		warning: {
			light: "#f3b999",
			main: "#ed9666",
			dark: "#e15000",
			contrastText: "#fff",
		},
		error: {
			light: "#d0736e",
			main: "#c1453d",
			dark: "#b1160d",
			contrastText: "#fff",
		},
		// background: {
		// 	default: "#161b22",
		// 	paper: "#30363d",
		// },
	},
});

export default theme;
