import { Injectable } from '@nestjs/common';

import { Observable, of } from 'rxjs';

import { EntityType } from '@dark-rush-photography/shared/types';

@Injectable()
export class EntitySocialMediaPostProvider {
  post$(entityType: EntityType, entityId: string): Observable<void> {
    return of(undefined);
  }
}
