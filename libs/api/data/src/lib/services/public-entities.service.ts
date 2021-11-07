import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import {
  EntityFindAllPublicResponse,
  EntityFindOnePublicResponse,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { EntityFindPublicProvider } from '../providers/entity-find-public.provider';

@Injectable()
export class PublicEntitiesService {
  constructor(
    private readonly entityFindPublicProvider: EntityFindPublicProvider
  ) {}

  findAllPublic$(
    entityType: EntityType
  ): Observable<EntityFindAllPublicResponse> {
    return this.entityFindPublicProvider.findAllPublicEntities$(entityType);
  }

  findOnePublic$(entityId: string): Observable<EntityFindOnePublicResponse> {
    return this.entityFindPublicProvider.findOnePublicEntity$(entityId);
  }
}
