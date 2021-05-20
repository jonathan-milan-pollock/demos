import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { Metadata } from '@dark-rush-photography/website/types';
import { Store } from '@ngrx/store';

import { Event } from '@dark-rush-photography/shared-types';

@Injectable({
  providedIn: 'root',
})
export class MetaEventResolver implements Resolve<Metadata> {
  constructor(
    private eventStore: Store<{
      event: { events: Event[] };
    }>
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Metadata> {
    return this.eventStore.select('event').pipe(
      take(1),
      map(
        (event) =>
          ({
            title: event.events[0].title,
            description: event.events[0].description,
            url: route.url.toString(),
          } as Metadata)
      )
    );
  }
}
