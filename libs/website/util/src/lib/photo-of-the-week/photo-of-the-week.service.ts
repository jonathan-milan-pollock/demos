import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';

@Injectable({
  providedIn: 'root',
})
export class PhotoOfTheWeekService {
  photoOfTheWeek = new Subject<PhotoOfTheWeek>();
}
