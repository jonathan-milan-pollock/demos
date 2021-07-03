import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared/types';

@Injectable()
export class PhotoOfTheWeekService {
  constructor(private readonly http: HttpClient) {}

  getAll$(): Observable<PhotoOfTheWeek[]> {
    return this.http.get<PhotoOfTheWeek[]>(
      'http://localhost:4200/api/photo-of-the-week'
    );
  }

  get$(id: string): Observable<PhotoOfTheWeek> {
    return this.http.get<PhotoOfTheWeek>(
      `http://localhost:4200/api/photo-of-the-week/${id}`
    );
  }

  add$(photoOfTheWeek: PhotoOfTheWeek): Observable<PhotoOfTheWeek> {
    return this.http.put<PhotoOfTheWeek>(
      `http://localhost:4200/api/admin/photo-of-the-week`,
      photoOfTheWeek
    );
  }

  update$(
    id: string,
    photoOfTheWeek: PhotoOfTheWeek
  ): Observable<PhotoOfTheWeek> {
    return this.http.put<PhotoOfTheWeek>(
      `http://localhost:4200/api/admin/photo-of-the-week/${id}`,
      photoOfTheWeek
    );
  }

  delete$(id: string): Observable<string> {
    return this.http.delete<string>(
      `http://localhost:4200/api/admin/photo-of-the-week/${id}`
    );
  }
}
