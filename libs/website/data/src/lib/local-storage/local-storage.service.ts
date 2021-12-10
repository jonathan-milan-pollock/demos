import { Injectable } from '@angular/core';

import {
  LocalStorageData,
  LOCAL_STORAGE_DATA,
} from '@dark-rush-photography/website/types';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  getLocalStorageData(): LocalStorageData | undefined {
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_DATA);
    return localStorageData ? JSON.parse(localStorageData) : undefined;
  }

  setLocalStorageData(localStorageData: LocalStorageData): void {
    localStorage.setItem(LOCAL_STORAGE_DATA, JSON.stringify(localStorageData));
  }
}
