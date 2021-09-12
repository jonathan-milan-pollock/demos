import * as path from 'path';
import { Injectable } from '@nestjs/common';

import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType, MediaState } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityFound,
  validateEntityType,
} from '../entities/entity-validation.functions';
import { validateImageDateCreated } from '../content/image-validation.functions';
import { ImageUpdateProvider } from './image-update.provider';

@Injectable()
export class EntityPostProvider {
  constructor(private readonly imageUpdateProvider: ImageUpdateProvider) {}

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
          of(documentModel),
          from(
            documentModel.images.filter(
              (image) => image.state === MediaState.Selected
            )
          ),
        ])
      ),
      concatMap(([documentModel, image]) =>
        this.imageUpdateProvider.update$(
          image,
          {
            fileName: `${documentModel.slug}${path.extname(image.fileName)}`,
            order: image.order,
            isStarred: image.isStarred,
            isLoved: image.isLoved,
            title: image.title,
            description: image.seoDescription,
            keywords: image.seoKeywords,
            dateCreated: validateImageDateCreated(image),
            datePublished: image.datePublished,
            skipExif: image.skipExif,
            isThreeSixty: image.isThreeSixty,
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
      //concatMap(([video, documentModel]) =>
      //  this.videoProvider.update$(
      //    video,
      //    {
      //      fileName: `${documentModel.slug}${path.extname(video.fileName)}`,
      //      state: MediaState.Posted,
      //    },
      //    documentModel,
      //    entityModel
      //  )
      //),
      map(() => undefined)
    );
  }
}
