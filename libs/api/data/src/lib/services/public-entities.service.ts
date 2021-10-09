import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import {
  EntityMinimalPublic,
  EntityPublic,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { EntityFindPublicProvider } from '../providers/entity-find-public.provider';

@Injectable()
export class PublicEntitiesService {
  constructor(
    private readonly entityFindPublicProvider: EntityFindPublicProvider
  ) {}

  findAllPublic$(entityType: EntityType): Observable<EntityMinimalPublic[]> {
    return this.entityFindPublicProvider.findAllPublicEntities$(entityType);
  }

  findOnePublic$(
    entityType: EntityType,
    entityId: string
  ): Observable<EntityPublic> {
    return this.entityFindPublicProvider.findOnePublicEntity$(
      entityType,
      entityId
    );
  }
}
