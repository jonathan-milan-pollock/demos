import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Destination } from '@dark-rush-photography/shared/types';

@Injectable()
export class DestinationsService {
  constructor(private readonly http: HttpClient) {}

  getAll$(): Observable<Destination[]> {
    return this.http.get<Destination[]>(
      'http://localhost:4200/api/destinations'
    );
  }

  get$(id: string): Observable<Destination> {
    return this.http.get<Destination>(
      `http://localhost:4200/api/destinations/${id}`
    );
  }

  add$(destination: Destination): Observable<Destination> {
    return this.http.post<Destination>(
      `http://localhost:4200/api/admin/destinations`,
      destination
    );
  }

  update$(id: string, destination: Destination): Observable<Destination> {
    return this.http.put<Destination>(
      `http://localhost:4200/api/admin/destinations/${id}`,
      destination
    );
  }

  delete$(id: string): Observable<string> {
    return this.http.delete<string>(
      `http://localhost:4200/api/admin/destinations/${id}`
    );
  }
}
