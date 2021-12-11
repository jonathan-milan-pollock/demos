import { ThemeType } from '@dark-rush-photography/best-of/types';
import { findIsLargeBrowserWindow } from './browser.functions';

export const findDefaultThemeType = (windowWidth: number): ThemeType => {
  return findIsLargeBrowserWindow(windowWidth)
    ? ThemeType.Dark
    : ThemeType.Light;
};
