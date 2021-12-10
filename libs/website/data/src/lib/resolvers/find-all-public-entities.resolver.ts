import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { EntityFindAllPublicResponse } from '@dark-rush-photography/shared/types';
import { findEntityTypeFromRouteConfigPath } from '@dark-rush-photography/website/util';
import { EntitiesService } from '../store/entities/entities.service';

@Injectable({
  providedIn: 'root',
})
export class FindAllPublicEntitiesResolver
  implements Resolve<EntityFindAllPublicResponse>
{
  constructor(private readonly entitiesService: EntitiesService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<EntityFindAllPublicResponse> {
    if (!route.routeConfig || route.routeConfig.path === undefined) {
      throw new Error('Route config path is undefined');
    }

    const entityType = findEntityTypeFromRouteConfigPath(
      route.routeConfig.path
    );
    return this.entitiesService.findAllPublicEntities$(entityType);
  }
}
