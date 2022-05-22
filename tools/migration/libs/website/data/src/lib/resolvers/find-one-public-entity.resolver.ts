import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { concatMap, Observable, of } from 'rxjs';

import { EntityFindOnePublicResponse } from '@dark-rush-photography/shared/types';
import { findEntityTypeFromUrlSegment } from '@dark-rush-photography/website/util';
import { EntitiesService } from '../store/entities/entities.service';

@Injectable({
  providedIn: 'root',
})
export class FindOnePublicEntityResolver
  implements Resolve<EntityFindOnePublicResponse | undefined>
{
  constructor(private readonly entitiesService: EntitiesService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<EntityFindOnePublicResponse | undefined> {
    if (route.url.length !== 2) {
      throw new Error('Two url segments are required to find entity');
    }
    const firstUrlSegment = route.url[0];
    const secondUrlSegment = route.url[1];

    const entityType = findEntityTypeFromUrlSegment(firstUrlSegment.path);
    return this.entitiesService.findAllPublicEntities$(entityType).pipe(
      concatMap((entityFindAllPublicResponse) => {
        const minimalEntity =
          entityFindAllPublicResponse.minimalPublicEntities.find(
            (minimalEntity) => minimalEntity.slug === secondUrlSegment.path
          );
        if (!minimalEntity) return of(undefined);

        return this.entitiesService.findOnePublicEntity$(minimalEntity.id);
      })
    );
  }
}
