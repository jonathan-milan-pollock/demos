import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { concatMap, from, map, Observable } from 'rxjs';

import {
  MediaState,
  MediaType,
  Video,
} from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { loadMedia } from '../content/media.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { loadVideo } from '../content/video.functions';
import { validateVideoFound } from '../content/video-validation.functions';

@Injectable()
export class VideoProvider {
  loadMedia(
    type: MediaType,
    id: string,
    fileName: string,
    state: MediaState,
    documentModel: DocumentModel
  ): Media {
    return loadMedia(type, id, fileName, state, documentModel);
  }

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
                fileName,
                state: MediaState.Posted,
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
        return loadVideo(validateVideoFound(id, documentModel));
      })
    );
  }

  remove$(
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos.filter((video) => video.id !== id),
            ],
          })
        )
      ),
      map(validateEntityFound)
    );
  }
}
