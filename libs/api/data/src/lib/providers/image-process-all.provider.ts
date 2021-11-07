import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  ImageDimension,
  ImageDimensionType,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { getEntityTypeImageDimensionTypes } from '@dark-rush-photography/shared/util';
import { getImageDimension } from '@dark-rush-photography/api/util';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ImageProcessOneProvider } from './image-process-one.provider';

@Injectable()
export class ImageProcessAllProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProcessOneProvider: ImageProcessOneProvider
  ) {}

  processAllImages$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const imagesToPublish = documentModel.images.filter(
          (image) =>
            image.state === ImageState.Selected ||
            image.state === ImageState.Public
        );
        if (imagesToPublish.length === 0) return of(undefined);

        const imageDimensionTypes = getEntityTypeImageDimensionTypes(
          documentModel.type
        );
        const imageDimensions = imageDimensionTypes.reduce(
          (
            imageDimensions: ImageDimension[],
            imageDimensionType: ImageDimensionType
          ) => [...imageDimensions, getImageDimension(imageDimensionType)],
          []
        );
        return from(imagesToPublish).pipe(
          concatMap((imageToPublish) =>
            this.imageProcessOneProvider.processImage$(
              imageToPublish,
              documentModel,
              imageDimensions
            )
          ),
          last()
        );
      }),
      map(() => undefined)
    );
  }
}
