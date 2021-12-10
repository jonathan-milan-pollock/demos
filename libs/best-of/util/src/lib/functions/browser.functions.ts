import { isEdge, isFirefox } from 'react-device-detect';

import {
  APPLICATION_LAYOUT_MASTER_WIDTH,
  BrowserWindow,
} from '@dark-rush-photography/best-of/types';

export const openInBrowserWindow = (
  browserWindow: BrowserWindow,
  url: string
): string => {
  const openBrowserWindow = browserWindow.open(url, '_blank');
  if (openBrowserWindow) openBrowserWindow.focus();
  return url;
};

export const findBrowserHasColorScrollbar = () => !(isEdge || isFirefox);

export const findIsLargeBrowserWindow = (windowWidth: number) => {
  return windowWidth >= APPLICATION_LAYOUT_MASTER_WIDTH * 2;
};
