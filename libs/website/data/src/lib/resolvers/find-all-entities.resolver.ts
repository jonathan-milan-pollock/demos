import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { concatMap, from, Observable, pluck, toArray } from 'rxjs';

import { EntityPublic } from '@dark-rush-photography/shared/types';
import { findEntityTypeFromRouteConfigPath } from '@dark-rush-photography/website/util';
import { EntitiesService } from '../store/entities/entities.service';

@Injectable({
  providedIn: 'root',
})
export class FindAllEntitiesResolver implements Resolve<EntityPublic[]> {
  constructor(private readonly entitiesService: EntitiesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EntityPublic[]> {
    if (!route.routeConfig || route.routeConfig.path === undefined) {
      throw new Error('Route config path is undefined');
    }

    const entityType = findEntityTypeFromRouteConfigPath(
      route.routeConfig.path
    );

    return this.entitiesService.findAllPublicEntities$(entityType).pipe(
      concatMap((findAllResponse) => {
        if (findAllResponse.minimalPublicEntities.length == 0) {
          throw new Error('Could not find entities');
        }
        return from(findAllResponse.minimalPublicEntities).pipe(
          concatMap((entity) =>
            this.entitiesService.findOnePublicEntity$(entity.id)
          ),
          pluck('publicEntity'),
          toArray<EntityPublic>()
        );
      })
    );
  }
}
