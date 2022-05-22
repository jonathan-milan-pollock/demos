import { IFocusable } from './focusable.interface';

export interface BrowserWindow {
  open(url: string, windowName: string): IFocusable;
}
