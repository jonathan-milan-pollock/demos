/* eslint-disable @typescript-eslint/no-unused-vars */
import * as createPalette from '@material-ui/core/styles/createPalette';
import Theme from 'src/models/Theme';

declare module '@material-ui/core/styles/createPalette' {
    interface PaletteOptions {
        custom: Theme;
    }

    interface Palette {
        custom: Theme;
    }
}
