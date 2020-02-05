import { isEdge, isFirefox } from 'react-device-detect';
import BrowserWindow from 'src/models/BrowserWindow';

export const openInBrowserWindow = (
    browserWindow: BrowserWindow,
    url: string
): string => {
    const openBrowserWindow = browserWindow.open(url, '_blank');
    if (openBrowserWindow) openBrowserWindow.focus();
    return url;
};

export const findBrowserHasColorScrollbar = () => !(isEdge || isFirefox);
