import { ThemeType } from '@dark-rush-photography/website/types';
import Theme from 'libs/website/types/src/lib/interfaces/theme.interface';
import { findIsLargeBrowserWindow } from './browser.functions';

export const loadTheme = (themeType: ThemeType): Theme => {
  return themeType === ThemeType.Dark ? darkTheme : lightTheme;
};

export const findDefaultThemeType = (windowWidth: number): ThemeType => {
  return findIsLargeBrowserWindow(windowWidth)
    ? ThemeType.Dark
    : ThemeType.Light;
};
