import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';

import { Event } from '@dark-rush-photography/shared-types';
import { EventsService } from './events.service';

@Injectable()
export class EventsServiceMock extends EventsService {
  constructor() {
    super({} as HttpClient);
  }

  getAll$(): Observable<Event[]> {
    return EMPTY;
  }

  get$(id: string): Observable<Event> {
    return of({ id: id } as Event);
  }

  add$(event: Event): Observable<Event> {
    return of(event);
  }

  update$(id: string, event: Event): Observable<Event> {
    const { id: updateId, ...updateEvent } = event;
    return of({ id: updateId, ...updateEvent });
  }

  delete$(id: string): Observable<string> {
    return of(id);
  }
}
