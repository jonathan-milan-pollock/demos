import { isEdge, isFirefox } from 'react-device-detect';

import {
  ApplicationLayout,
  BrowserWindow,
} from '@dark-rush-photography/website/types';

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
  return windowWidth >= ApplicationLayout.MASTER_WIDTH * 2;
};
