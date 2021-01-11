import React, { ReactNode } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import { createCustomMuiTheme } from '../theme/custom-mui-theme';
import { darkVariables } from '../theme/variables-dark';
import { addFontAwesomeIcons } from '../theme/font-awesome-icons';

type Props = {
  children?: ReactNode;
};

const MockedThemeProvider = ({ children }: Props) => {
  addFontAwesomeIcons();

  const customMuiTheme = createCustomMuiTheme(darkVariables);
  return <ThemeProvider theme={customMuiTheme}>{children}</ThemeProvider>;
};

export default MockedThemeProvider;
