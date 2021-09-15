import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { About } from '@dark-rush-photography/shared/types';

@Injectable({ providedIn: 'root' })
export class AboutService {
  constructor(private readonly http: HttpClient) {}

  findAll$(): Observable<About[]> {
    return this.http.get<About[]>(`http://localhost:1111/api/v1/about`);
  }
}
