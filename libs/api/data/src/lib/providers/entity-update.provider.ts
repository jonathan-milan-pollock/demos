import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { EntityType, ENV } from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/api/types';

import { DocumentModel } from '../schema/document.schema';
import { Observable, of } from 'rxjs';

@Injectable()
export class EntityUpdateProvider {
  constructor(@Inject(ENV) private readonly env: Env) {}

  update$(
    entityType: EntityType,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return of(undefined);
  }

  // ** Update ** //
  // Update Entity
  //readonly entityGroup?: string;
  //readonly entitySlug: string;

  // Needs to move the blobs to the new path and remove the old paths
  // If fails need a way to try again (override isProcessing check)
  // On success will set isProcessing to false

  /*
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map(validateNotProcessingEntity),
      concatMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      mapTo(undefined)
    );*/
}
