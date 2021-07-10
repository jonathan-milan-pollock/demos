import { Focusable } from '../interfaces/focusable.interface';

export interface BrowserWindow {
  open(url: string, windowName: string): Focusable;
}
