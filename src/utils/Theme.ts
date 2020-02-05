import { ThemeType } from 'src/enums/ThemeType';
import Theme from 'src/models/Theme';
import { darkTheme } from 'src/themes/DarkTheme';
import { lightTheme } from 'src/themes/LightTheme';

export const loadTheme = (themeType: ThemeType): Theme => {
    return themeType === ThemeType.Dark ? darkTheme : lightTheme;
};
