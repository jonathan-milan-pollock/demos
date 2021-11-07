import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  EntityMinimalPublic,
  EntityPublic,
  EntityType,
} from '@dark-rush-photography/shared/types';

@Injectable({ providedIn: 'root' })
export class PublicEntitiesService {
  constructor(private readonly http: HttpClient) {}

  findAll$(entityType: EntityType): Observable<EntityMinimalPublic[]> {
    return this.http.get<EntityMinimalPublic[]>(
      `http://localhost:4200/api/v1/entities/${entityType}`
    );
  }

  findOne$(entityId: string): Observable<EntityPublic> {
    return this.http.get<EntityPublic>(
      `http://localhost:4200/api/v1/entities/${entityId}`
    );
  }
}
