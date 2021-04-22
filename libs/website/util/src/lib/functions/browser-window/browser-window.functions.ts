import * as E from 'fp-ts/Either';

import {
  ObjectUndefinedError,
  ObjectPropertyUndefinedError,
} from '@dark-rush-photography/shared-types';
import { BrowserWindow } from '@dark-rush-photography/website/types';

export const validateBrowserWindow = (
  browserWindow: unknown
): E.Either<
  ObjectUndefinedError | ObjectPropertyUndefinedError,
  BrowserWindow
> => {
  if (!(browserWindow instanceof Object))
    return E.left(ObjectUndefinedError.of('window'));

  if (!('__env' in browserWindow))
    return E.left(ObjectPropertyUndefinedError.of('window')('__env'));

  if (!('open' in browserWindow))
    return E.left(ObjectPropertyUndefinedError.of('window')('open'));

  return E.right(browserWindow as BrowserWindow);
};
