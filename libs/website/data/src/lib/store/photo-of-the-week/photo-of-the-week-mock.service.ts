import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';

@Injectable()
export class PhotoOfTheWeekServiceMock extends PhotoOfTheWeekService {
  constructor() {
    super({} as HttpClient);
  }

  getAll(): Observable<PhotoOfTheWeek[]> {
    return EMPTY;
  }

  get(id: string): Observable<PhotoOfTheWeek> {
    return of({ id: id } as PhotoOfTheWeek);
  }

  add(photoOfTheWeek: PhotoOfTheWeek): Observable<PhotoOfTheWeek> {
    return of(photoOfTheWeek);
  }

  update(
    id: string,
    photoOfTheWeek: PhotoOfTheWeek
  ): Observable<PhotoOfTheWeek> {
    const { id: updateId, ...updatePhotoOfTheWeek } = photoOfTheWeek;
    return of({ id: updateId, ...updatePhotoOfTheWeek });
  }

  delete(id: string): Observable<string> {
    return of(id);
  }
}
