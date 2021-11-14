import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  ImageDimension,
  ImageDimensionType,
  ImageState,
} from '@dark-rush-photography/shared/types';
import {
  getEntityTypeHasLovedImages,
  getEntityTypeHasStarredImage,
  getEntityTypeImageDimensionTypes,
  getEntityTypeLovedImageDimensionTypes,
  getEntityTypeStarredImageDimensionTypes,
} from '@dark-rush-photography/shared/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { getImageDimension } from '@dark-rush-photography/api/util';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  validatePublishLovedImages,
  validatePublishStarredImage,
} from '../images/image-field-validation.functions';
import { ImageProcessOneProvider } from './image-process-one.provider';

@Injectable()
export class ImageProcessAllProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProcessOneProvider: ImageProcessOneProvider
  ) {}

  processStarredImage$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        if (!getEntityTypeHasStarredImage(documentModel.type))
          return of(undefined);

        const starredPublishImage = validatePublishStarredImage(
          documentModel.images
        );

        const starredImageDimensionTypes =
          getEntityTypeStarredImageDimensionTypes(documentModel.type);

        const starredImageDimensions = starredImageDimensionTypes.reduce(
          (
            imageDimensions: ImageDimension[],
            imageDimensionType: ImageDimensionType
          ) => [...imageDimensions, getImageDimension(imageDimensionType)],
          []
        );

        return this.imageProcessOneProvider.processImage$(
          starredPublishImage,
          documentModel,
          starredImageDimensions
        );
      })
    );
  }

  processLovedImages$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        if (!getEntityTypeHasLovedImages(documentModel.type))
          return of(undefined);

        const publishLovedImages = validatePublishLovedImages(
          documentModel.images
        );

        const lovedImageDimensionTypes = getEntityTypeLovedImageDimensionTypes(
          documentModel.type
        );

        const lovedImageDimensions = lovedImageDimensionTypes.reduce(
          (
            imageDimensions: ImageDimension[],
            imageDimensionType: ImageDimensionType
          ) => [...imageDimensions, getImageDimension(imageDimensionType)],
          []
        );

        return from(publishLovedImages).pipe(
          concatMap((lovedImageToPublish) =>
            this.imageProcessOneProvider.processImage$(
              lovedImageToPublish,
              documentModel,
              lovedImageDimensions
            )
          ),
          last()
        );
      }),
      map(() => undefined)
    );
  }

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
