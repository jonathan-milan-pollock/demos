import { flow } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';

import {
  BrowserWindow,
  EnvironmentVariables,
} from '@dark-rush-photography/website/types';
import { ObjectPropertyUndefinedError } from '@dark-rush-photography/shared-types';
import { validateBrowserWindow } from '../window/browser-window.functions';

export const environmentVariablesResult = (
  browserWindow: unknown
): E.Either<ObjectPropertyUndefinedError, EnvironmentVariables> =>
  flow(
    validateBrowserWindow,
    E.chainW(validateEnvironmentVariables)
  )(browserWindow);

export const validateEnvironmentVariables = (
  browserWindow: BrowserWindow
): E.Either<ObjectPropertyUndefinedError, EnvironmentVariables> => {
  if (browserWindow.__env.apiBaseUrl === undefined) {
    return E.left(ObjectPropertyUndefinedError.of('envVars')('apiBaseUrl'));
  }
  //typeof user.name === 'string'
  return E.right(browserWindow.__env);
};
