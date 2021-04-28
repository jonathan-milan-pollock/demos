import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageRefService } from '../local-storage-ref/local-storage-ref.service';

interface MyData {
  name: string;
  age: number;
}

@Injectable({
  providedIn: 'platform',
})
export class LocalStorageService {
  private _localStorage: Storage;
  private _myData$ = new BehaviorSubject<MyData | undefined>(undefined);

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage = this._localStorageRefService.localStorage;
  }

  myData$ = this._myData$.asObservable();

  setInfo(data: MyData): void {
    const jsonData = JSON.stringify(data);
    this._localStorage.setItem('myData', jsonData);
    this._myData$.next(data);
  }

  loadInfo(): void {
    const jsonData = this._localStorage.getItem('myData');
    if (!jsonData) {
      return;
    }
    const data = JSON.parse(jsonData);
    this._myData$.next(data);
  }

  clearInfo(): void {
    this._localStorage.removeItem('myData');
    this._myData$.next(undefined);
  }

  clearAllLocalStorage(): void {
    this._localStorage.clear();
    this._myData$.next(undefined);
  }
}
