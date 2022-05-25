import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00b2a9',
    },
    secondary: {
      main: '#00b2a9',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
