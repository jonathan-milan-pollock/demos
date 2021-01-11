/* eslint-disable @typescript-eslint/no-unused-vars */
import * as createPalette from '@material-ui/core/styles/createPalette';

import ThemeVariables from '../theme/theme-variables';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    custom: ThemeVariables;
  }

  interface Palette {
    custom: ThemeVariables;
  }
}
