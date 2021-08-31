import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { map, Observable, take } from 'rxjs';

import { Metadata } from '@dark-rush-photography/website/types';
import { Store } from '@ngrx/store';

import { Event } from '@dark-rush-photography/shared/types';

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
            title: event.events[0].seoTitle,
            description: event.events[0].seoDescription,
            url: route.url.toString(),
          } as Metadata)
      )
    );
  }
}
