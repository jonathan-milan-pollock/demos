import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  Entity,
  Image,
  ImageDimension,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';
import { getEntityTypeHasImageVideo } from '@dark-rush-photography/shared/util';
import {
  findImageResolution$,
  getImageDimension,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validate-document-model.functions';
import {
  updateImageCreatedDate$,
  updateImageSmallResolution$,
} from '../images/image-repository.functions';
import { validateImageFound } from '../images/image-validation.functions';
import { ImageExifProvider } from './image-exif.provider';
import { ImageTinifyProvider } from './image-tinify.provider';
import { ImageResizeProvider } from './image-resize.provider';

@Injectable()
export class ImageProcessOneProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageExifProvider: ImageExifProvider,
    private readonly imageTinifyProvider: ImageTinifyProvider,
    private readonly imageResizeProvider: ImageResizeProvider
  ) {}

  processNewImage$(image: Image): Observable<void> {
    const ipadImageDimensionTypes = [
      ImageDimensionType.IPadSmall,
      ImageDimensionType.IPadMedium,
      ImageDimensionType.IPadLarge,
    ];
    const iPadImageDimensions = ipadImageDimensionTypes.reduce(
      (
        imageDimensions: ImageDimension[],
        imageDimensionType: ImageDimensionType
      ) => [...imageDimensions, getImageDimension(imageDimensionType)],
      []
    );

    return findEntityById$(image.entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        return this.imageExifProvider.findExifCreatedDate$(image).pipe(
          concatMap((createdDate) =>
            updateImageCreatedDate$(
              image,
              createdDate,
              documentModel,
              this.entityModel
            )
          ),
          concatMap(() =>
            this.imageTinifyProvider.tinifyImage$(
              image.storageId,
              image.fileName
            )
          ),
          concatMap(() => from(iPadImageDimensions)),
          concatMap((iPadImageDimension) =>
            this.imageResizeProvider.resizeImage$(
              image.storageId,
              image.fileName,
              iPadImageDimension
            )
          ),
          last(),
          map(() => undefined)
        );
      })
    );
  }

  processImage$(
    image: Image,
    entity: Entity,
    imageDimensions: ImageDimension[]
  ): Observable<void> {
    const smallImageDimension = getImageDimension(ImageDimensionType.Small);

    return this.imageExifProvider.exifImage$(image, entity).pipe(
      concatMap(() =>
        this.imageResizeProvider.resizeImage$(
          image.storageId,
          image.fileName,
          smallImageDimension
        )
      ),
      concatMap((filePath) => findImageResolution$(filePath)),
      concatMap((resolution) => {
        return findEntityById$(image.entityId, this.entityModel).pipe(
          map(validateEntityFound),
          concatMap((documentModel) => {
            const foundImage = validateImageFound(image.id, documentModel);
            return updateImageSmallResolution$(
              foundImage,
              resolution,
              documentModel,
              this.entityModel
            );
          })
        );
      }),
      concatMap(() =>
        from(
          imageDimensions.filter(
            (imageDimension) => imageDimension.type !== ImageDimensionType.Small
          )
        )
      ),
      concatMap((imageDimension) =>
        this.imageResizeProvider.resizeImage$(
          image.storageId,
          image.fileName,
          imageDimension
        )
      ),
      map(() => undefined)
    );
  }

  processImageVideo$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        if (!getEntityTypeHasImageVideo(documentModel.type)) {
          return of(undefined);
        }
        return of(undefined);
      })
    );
  }
}
