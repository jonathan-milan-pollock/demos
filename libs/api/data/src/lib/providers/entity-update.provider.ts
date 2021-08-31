import { Injectable } from '@nestjs/common';

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

import { EntityType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityFound,
  validateEntityType,
} from '../entities/entity-validation.functions';
import { ImageUpdateProvider } from './image-update.provider';
import { validateImageDateCreated } from '../content/image-validation.functions';

@Injectable()
export class EntityUpdateProvider {
  constructor(private readonly imageUpdateProvider: ImageUpdateProvider) {}

  update$(
    entityType: EntityType,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      concatMap((documentModel) =>
        combineLatest([from(documentModel.images), of(documentModel)])
      ),
      concatMap(([image, documentModel]) =>
        this.imageUpdateProvider.update$(
          image,
          {
            fileName: image.fileName,
            state: image.state,
            order: image.order,
            isStarred: image.isStarred,
            isLoved: image.isLoved,
            title: image.seoTitle,
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
        combineLatest([from(documentModel.videos), of(documentModel)])
      ),
      // concatMap(([video, documentModel]) =>
      //   update$(
      //     video,
      //     {
      //       fileName: video.fileName,
      //       state: video.state,
      //     },
      //     documentModel,
      //    entityModel
      //  )
      //),
      mapTo(undefined)
    );
  }
}
