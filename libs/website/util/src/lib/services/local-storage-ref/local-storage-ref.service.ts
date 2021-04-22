import { Injectable } from '@angular/core';

import { getLocalStorage } from '../../functions/local-storage/local-storage.functions';

@Injectable({
  providedIn: 'platform',
})
export class LocalStorageRefService {
  get localStorage(): Storage {
    return getLocalStorage();
  }
}
