import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { EntityType, ENV } from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/api/types';

import { DocumentModel } from '../schema/document.schema';
import { AzureStorageProvider } from './azure-storage.provider';
import { Observable, of } from 'rxjs';

@Injectable()
export class EntityUpdateProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

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
      switchMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      switchMapTo(
        serverlessUpdateEntityProcess$(this.env.serverless, this.httpService, {
          entityType,
          entityId,
          entityUpdate,
        })
      ),
      mapTo(undefined)
    );*/
}
