import * as E from 'fp-ts/Either';

import { validateBrowserWindow } from './browser-window.functions';
import {
  EnvironmentVariables,
  Focusable,
} from '@dark-rush-photography/website/types';
import {
  ObjectPropertyUndefinedError,
  ObjectUndefinedError,
} from '@dark-rush-photography/shared-types';

describe('browser-window.functions', () => {
  describe('validateBrowserWindow', () => {
    it('should return a browser window if it has the correct properties', () => {
      const validationResult = validateBrowserWindow({
        __env: {} as EnvironmentVariables,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        open(url: string, windowName: string): Focusable {
          return {} as Focusable;
        },
      });
      expect(E.isRight(validationResult)).toBe(true);
    });

    it('should return an ObjectUndefinedError if the browser window is not an object', () => {
      const validationResult = validateBrowserWindow(undefined);
      expect(
        E.isLeft(validationResult) ? validationResult.left : undefined
      ).toBeInstanceOf(ObjectUndefinedError);
    });

    it('should return an ObjectPropertyUndefinedError if the browser window does not have an open method', () => {
      const validationResult = validateBrowserWindow({
        __env: {} as EnvironmentVariables,
      });
      expect(
        E.isLeft(validationResult) ? validationResult.left : undefined
      ).toBeInstanceOf(ObjectPropertyUndefinedError);
    });

    it('should return an error message for not having an open method', () => {
        const validationResult = validateBrowserWindow({
          __env: {} as EnvironmentVariables,
        });
        expect(
          E.isLeft(validationResult) ? validationResult.left.message : undefined
        ).toBe('Object window property __env undefined');
      });

    it('should return an ObjectPropertyUndefinedError if the browser window does not have an __env property', () => {
      const validationResult = validateBrowserWindow({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        open(url: string, windowName: string): Focusable {
          return {} as Focusable;
        },
      });
      expect(
        E.isLeft(validationResult) ? validationResult.left : undefined
      ).toBeInstanceOf(ObjectPropertyUndefinedError);
    });
  });
});
