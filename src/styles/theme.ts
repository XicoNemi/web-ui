import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#E6077E',
    },
    secondary: {
      main: '#8146A0',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
