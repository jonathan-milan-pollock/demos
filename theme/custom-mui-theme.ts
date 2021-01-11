import { createMuiTheme } from '@material-ui/core/styles';

import ApplicationUi from '../constants/app-ui-constants';
import ThemeVariables from './theme-variables';

export const createCustomMuiTheme = (themeVariables: ThemeVariables) => {
  return createMuiTheme({
    palette: {
      primary: {
        main: '#00b2a9',
      },
      background: {
        default: ApplicationUi.BACKGROUND_COLOR,
      },
      custom: themeVariables,
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '*::-webkit-scrollbar': {
            width: 13,
          },
          '*::-webkit-scrollbar-track': {
            '-webkit-border-radius': 10,
            borderRadius: 10,
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0, 0, 0, 0.2)',
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.2)',
          },
          '*::-webkit-scrollbar-thumb': {
            '-webkit-border-radius': 10,
            borderRadius: 10,
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0, 0, 0, 0.2)',
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.2)',
            background: 'rgba(0, 178, 169, 0.9)',
          },
          '*::-webkit-scrollbar-thumb:window-inactive': {
            background: 'rgba(0, 178, 169, 0.9)',
          },
        },
      },
    },
  });
};
