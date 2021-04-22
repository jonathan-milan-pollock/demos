import { EnvironmentVariables } from './environment-variables.interface';
import { Focusable } from '../interfaces/Focusable.interface';

export interface BrowserWindow {
  __env: EnvironmentVariables;
  open(url: string, windowName: string): Focusable;
}
