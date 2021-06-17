import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';

import { Destination } from '@dark-rush-photography/shared-types';
import { DestinationsService } from './destinations.service';

@Injectable()
export class DestinationsServiceMock extends DestinationsService {
  constructor() {
    super({} as HttpClient);
  }

  getAll$(): Observable<Destination[]> {
    return EMPTY;
  }

  get$(id: string): Observable<Destination> {
    return of({ id: id } as Destination);
  }

  add$(destination: Destination): Observable<Destination> {
    return of(destination);
  }

  update$(id: string, destination: Destination): Observable<Destination> {
    const { id: updateId, ...updateDestination } = destination;
    return of({ id: updateId, ...updateDestination });
  }

  delete$(id: string): Observable<string> {
    return of(id);
  }
}
