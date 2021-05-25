import { Injectable } from '@angular/core';

import { LocalStorageData } from '@dark-rush-photography/website/types';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class LocalStorageService {
  getLocalStorageData(): Observable<LocalStorageData> {
    return EMPTY;
  }

  setLocalStorageData(localStorageData: LocalStorageData): void {
    console.log(localStorageData);
  }

  clearLocalStorageData(): void {
    console.log('clearLocalStorageData');
  }

  clearAllLocalStorage(): void {
    console.log('clear');
  }
}
