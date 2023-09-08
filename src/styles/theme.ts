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
			main: "#1a946e",
			light: "#a3d4c5",
			dark: "#082c21",
			100: "#a3d4c5",
			200: "#8dcab7",
			300: "#5fb49a",
			400: "#319f7d",
			500: "#178563",
			600: "#12684d",
			700: "#105942",
			800: "#0d4a37",
			900: "#0a3b2c",
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
