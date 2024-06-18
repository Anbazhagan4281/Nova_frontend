import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Palette {
		orange: Palette['primary'];
		gray: Palette['primary'];
		white: Palette['primary'];
		darkblue: Palette['primary'];
	}

	interface PaletteOptions {
		orange: PaletteOptions['primary'];
		gray: PaletteOptions['primary'];
		white: PaletteOptions['primary'];
		darkblue: PaletteOptions['primary'];
	}

	interface ButtonPropsColorOverriders {
		orange: true;
		gray: true;
		white: true;
		darkblue: true;
	}
}

const orangeBase = '#fc8019';
const orangeMain = alpha(orangeBase, 0.9);

const grayBase = '#7a7a7a';
const grayMain = alpha(grayBase, 0.9);

const whiteBase = '#fff';
const whiteMain = alpha(whiteBase, 0.9);

const darkBlueBase = '#3060a8';
const darkBlueMain = alpha(darkBlueBase, 0.9);

export const theme = createTheme({
	typography: {
		button: {
			textTransform: 'none',
			fontWeight: 500,
		},
	},
	palette: {
		orange: {
			main: orangeMain,
			light: alpha(orangeBase, 0.7),
			dark: alpha(orangeBase, 2.9),
			contrastText: getContrastRatio(orangeMain, '#fff') > 4.5 ? '#fff' : '#000',
		},
		gray: {
			main: grayMain,
			light: alpha(grayBase, 0.7),
			dark: alpha(grayBase, 0.9),
			contrastText: getContrastRatio(grayMain, '#fff') > 4.5 ? '#fff' : '#000',
		},
		white: {
			main: whiteMain,
			light: alpha(whiteBase, 0.2),
			dark: alpha(whiteBase, 0.9),
			contrastText: getContrastRatio(whiteMain, '#000') > 4.5 ? '#000' : '#fff',
		},
		darkblue: {
			main: darkBlueMain,
			light: alpha(darkBlueBase, 0.2),
			dark: alpha(darkBlueBase, 0.9),
			contrastText: getContrastRatio(darkBlueMain, '#fff') > 4.5 ? '#fff' : '#000',
		},
		contrastThreshold: 4.5,
	},
});
