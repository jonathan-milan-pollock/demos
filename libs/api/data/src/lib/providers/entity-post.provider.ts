import { Injectable } from '@nestjs/common';

import * as path from 'path';
import { Model } from 'mongoose';
import {
  combineLatest,
  concatMap,
  from,
  map,
  mapTo,
  Observable,
  of,
} from 'rxjs';

import { EntityType, MediaState } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityFound,
  validateEntityType,
} from '../entities/entity-validation.functions';
import { validateImageDateCreated } from '../content/image-validation.functions';
import { validateVideoDateCreated } from '../content/video-validation.functions';
import { ImageUpdateProvider } from './image-update.provider';
import { VideoUpdateProvider } from './video-update.provider';

@Injectable()
export class EntityPostProvider {
  constructor(
    private readonly imageUpdateProvider: ImageUpdateProvider,
    private readonly videoUpdateProvider: VideoUpdateProvider
  ) {}

  post$(
    entityType: EntityType,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      concatMap((documentModel) =>
        combineLatest([
          from(
            documentModel.images.filter(
              (image) => image.state === MediaState.Selected
            )
          ),
          of(documentModel),
        ])
      ),
      concatMap(([image, documentModel]) =>
        this.imageUpdateProvider.update$(
          image,
          {
            fileName: `${documentModel.slug}${path.extname(image.fileName)}`,
            state: MediaState.Public,
            order: image.order,
            isStarred: image.isStarred,
            isLoved: image.isLoved,
            title: image.title,
            description: image.description,
            keywords: image.keywords,
            dateCreated: validateImageDateCreated(image),
            datePublished: image.datePublished,
            isThreeSixty: image.isThreeSixty,
            skipExif: image.skipExif,
          },
          documentModel,
          entityModel
        )
      ),
      concatMap((documentModel) =>
        combineLatest([
          from(
            documentModel.videos.filter(
              (video) => video.state === MediaState.Selected
            )
          ),
          of(documentModel),
        ])
      ),
      concatMap(([video, documentModel]) =>
        this.videoUpdateProvider.update$(
          video,
          {
            fileName: `${documentModel.slug}${path.extname(video.fileName)}`,
            state: MediaState.Public,
            order: video.order,
            isStarred: video.isStarred,
            title: video.title,
            description: video.description,
            keywords: video.keywords,
            dateCreated: validateVideoDateCreated(video),
            datePublished: video.datePublished,
            isThreeSixty: video.isThreeSixty,
            threeSixtySettings: video.threeSixtySettings,
            coverImageId: video.coverImageId,
            hlsUrl: video.hlsUrl,
            isFlyOver: video.isFlyOver,
          },
          documentModel,
          entityModel
        )
      ),
      mapTo(undefined)
    );
  }
}
