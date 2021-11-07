import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { map, Observable, of, take } from 'rxjs';

import { Metadata } from '@dark-rush-photography/website/types';

import { EntityType } from '@dark-rush-photography/shared/types';
import { findAllPublicEntities } from '../store/public-entity/public-entity.actions';

@Injectable({
  providedIn: 'root',
})
export class FindOneEntityResolver implements Resolve<Metadata> {
  resolve(route: ActivatedRouteSnapshot): Observable<Metadata> {
    return of();
    /*return findAllPublicEntities({ entityType: EntityType.About }).pipe(
      take(1),
      map(
        (event) =>
          ({
            title: event.events[0].title,
            description: event.events[0].seoDescription,
            url: route.url.toString(),
          } as Metadata)
      )
    );*/
  }
}
