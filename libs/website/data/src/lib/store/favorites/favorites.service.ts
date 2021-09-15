import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Favorites } from '@dark-rush-photography/shared/types';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  constructor(private readonly http: HttpClient) {}

  findOne$(): Observable<Favorites> {
    return this.http.get<Favorites>(`http://localhost:1111/api/v1/favorites`);
  }
}
