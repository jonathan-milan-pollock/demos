import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  EntityFindAllPublicResponse,
  EntityFindOnePublicResponse,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { EntitiesState } from './entities.state';

@Injectable({ providedIn: 'root' })
export class EntitiesService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store<EntitiesState>
  ) {}

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
