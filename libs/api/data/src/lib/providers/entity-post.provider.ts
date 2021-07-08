import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { Observable, of } from 'rxjs';

import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

@Injectable()
export class EntityPostProvider {
  post$(
    entityType: EntityType,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return of(undefined);
    /*
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map(validateNotProcessingEntity),
      concatMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      
      mapTo(undefined)
    );
    */
  }
}
