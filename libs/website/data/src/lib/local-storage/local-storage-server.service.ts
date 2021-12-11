/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

import { LocalStorageData } from '@dark-rush-photography/website/types';

@Injectable()
export class LocalStorageServerService {
  getLocalStorageData(): LocalStorageData | undefined {
    return undefined;
  }

  setLocalStorageData(_localStorageData: LocalStorageData): void {}
}
