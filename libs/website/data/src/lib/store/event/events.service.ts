import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Event } from '@dark-rush-photography/shared/types';

@Injectable()
export class EventsService {
  constructor(private readonly http: HttpClient) {}

  getAll$(): Observable<Event[]> {
    return this.http.get<Event[]>('http://localhost:4200/api/events');
  }

  get$(id: string): Observable<Event> {
    return this.http.get<Event>(`http://localhost:4200/api/events/${id}`);
  }

  add$(event: Event): Observable<Event> {
    return this.http.post<Event>(
      `http://localhost:4200/api/admin/events`,
      event
    );
  }

  update$(id: string, event: Event): Observable<Event> {
    return this.http.put<Event>(
      `http://localhost:4200/api/admin/events/${id}`,
      event
    );
  }

  delete$(id: string): Observable<string> {
    return this.http.delete<string>(
      `http://localhost:4200/api/admin/events/${id}`
    );
  }
}
