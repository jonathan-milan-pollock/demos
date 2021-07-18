import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { Observable, of } from 'rxjs';

import {
  EntityType,
  MediaProcess,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadMediaProcess,
  loadNewMediaProcess,
} from '../entities/media-process.functions';

@Injectable()
export class MediaProcessProvider {
  getEntityTypeFromMediaProcessType(
    mediaProcessType: MediaProcessType
  ): EntityType {
    return this.getEntityTypeFromMediaProcessType(mediaProcessType);
  }

  loadNewMediaProcess(slug: string): MediaProcess {
    return loadNewMediaProcess(slug);
  }

  loadMediaProcess(documentModel: DocumentModel): MediaProcess {
    return loadMediaProcess(documentModel);
  }

  process$(
    entityType: EntityType,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return of(undefined);
    /* return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      concatMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      
      mapTo(undefined)
    );
  }*/
  }
}
