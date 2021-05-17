import { Focusable } from '../interfaces/Focusable.interface';

export interface BrowserWindow {
  open(url: string, windowName: string): Focusable;
}
