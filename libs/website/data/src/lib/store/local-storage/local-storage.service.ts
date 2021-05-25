import { Injectable } from '@angular/core';

import {
  LocalStorageData,
  LOCAL_STORAGE_DATA,
} from '@dark-rush-photography/website/types';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable()
export class LocalStorageService {
  getLocalStorageData(): Observable<LocalStorageData> {
    const data = localStorage.getItem(LOCAL_STORAGE_DATA);
    return data ? of(JSON.parse(data)) : EMPTY;
  }

  setLocalStorageData(localStorageData: LocalStorageData): void {
    localStorage.setItem(LOCAL_STORAGE_DATA, JSON.stringify(localStorageData));
  }

  clearLocalStorageData(): void {
    localStorage.removeItem(LOCAL_STORAGE_DATA);
  }

  clearAllLocalStorage(): void {
    localStorage.clear();
  }
}
