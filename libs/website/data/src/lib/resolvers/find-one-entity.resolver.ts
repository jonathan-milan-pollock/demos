import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { concatMap, Observable, pluck } from 'rxjs';

import { EntityPublic } from '@dark-rush-photography/shared/types';
import { findEntityTypeFromRouteConfigPath } from '@dark-rush-photography/website/util';
import { EntitiesService } from '../store/entities/entities.service';

@Injectable({
  providedIn: 'root',
})
export class FindOneEntityResolver implements Resolve<EntityPublic> {
  constructor(private readonly entitiesService: EntitiesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EntityPublic> {
    if (!route.routeConfig || route.routeConfig.path === undefined) {
      throw new Error('Route config path is undefined');
    }

    const entityType = findEntityTypeFromRouteConfigPath(
      route.routeConfig.path
    );

    return this.entitiesService.findAllPublicEntities$(entityType).pipe(
      concatMap((findAllResponse) => {
        if (findAllResponse.minimalPublicEntities.length == 0) {
          throw new Error('Could not find entity');
        }
        if (findAllResponse.minimalPublicEntities.length !== 1) {
          throw new Error('Found more than 1 entity');
        }

        const entity = findAllResponse.minimalPublicEntities[0];
        return this.entitiesService
          .findOnePublicEntity$(entity.id)
          .pipe(pluck('publicEntity'));
      })
    );
  }
}
