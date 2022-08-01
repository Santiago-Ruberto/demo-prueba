import { createTheme } from "@mui/material/styles";

export const FONT_LATO = `'Lato', sans-serif`

export const theme = createTheme({
  divider: {
    marginBottom: '30px !important',
    marginTop: '0px !important',
    width: '30%',
    marginLeft: '10px !important'
  },
  palette: {
    background: {
      main: '#F5F5F5'
    },
    primary: {
      light: '#5d88b2',
      main: '#2c5b82',
      dark: '#003255',
      darker: '#011828',
      contrastText: '#fff',
    },
    secondary: {
      light: '#F1DDC9',
      main: '#ffbe96',
      dark: '#ca8e68',
      contrastText: '#000',
    },
    white: {
      main: '#ffffff'
    },
    text: {
      black: '#000000',
      blackLight: '#202020'
    },
    orange: {
      main: '#F26F3F'
    },
    grey: {
      greyIcon: "#888888"
    }

  },
  title: {
    color: '#333333',
    textTransform: 'uppercase',
    fontFamily: FONT_LATO,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    '@media (max-width: 400px)': {
      padding: 10,
      paddingBottom: 0,
    }
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    border: '0.5px solid #000000',
  },
  textCentered: {
    textAlign: 'center'
  }
});

export default theme