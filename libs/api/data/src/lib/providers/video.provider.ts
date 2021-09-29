import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { concatMap, from, map, Observable } from 'rxjs';

import { Video } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { reloadVideo } from '../content/content-load.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { validateVideoFound } from '../content/content-validation.functions';

@Injectable()
export class VideoProvider {
  add$(
    id: string,
    entityId: string,
    fileName: string,
    entityModel: Model<DocumentModel>
  ): Observable<Video> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos,
              {
                id,
                entityId,
                blobPathId: uuidv4(),
                fileName,
              },
            ],
          })
        )
      ),
      concatMap(() => this.findOne$(id, entityId, entityModel))
    );
  }

  findOne$(
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<Video> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        return reloadVideo(validateVideoFound(id, documentModel));
      })
    );
  }
}
