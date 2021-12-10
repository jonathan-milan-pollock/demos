import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  EntityFindAllPublicResponse,
  EntityFindOnePublicResponse,
  EntityType,
} from '@dark-rush-photography/shared/types';

@Injectable()
export class EntitiesServerService {
  constructor(private readonly httpClient: HttpClient) {}

  findAllPublicEntities$(
    entityType: EntityType
  ): Observable<EntityFindAllPublicResponse> {
    return this.httpClient.get<EntityFindAllPublicResponse>(
      `http://localhost:1111/api/v1/entities/entity-type/${entityType}`
    );
  }

  findOnePublicEntity$(
    entityId: string
  ): Observable<EntityFindOnePublicResponse> {
    return this.httpClient.get<EntityFindOnePublicResponse>(
      `http://localhost:1111/api/v1/entities/${entityId}`
    );
  }
}
