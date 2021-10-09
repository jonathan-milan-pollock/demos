import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Image, ImageDimensionType } from '@dark-rush-photography/shared/types';
import {
  getImageDimension,
  findImageResolution$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { updateImageSmallResolution$ } from '../content/content-repository.functions';
import { ImageTinifyProvider } from './image-tinify.provider';
import { ImageExifProvider } from './image-exif.provider';
import { ImageResizeProvider } from './image-resize.provider';
import { validateImageFound } from '../content/content-validation.functions';

@Injectable()
export class ImageProcessProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageTinifyProvider: ImageTinifyProvider,
    private readonly imageExifProvider: ImageExifProvider,
    private readonly imageResizeProvider: ImageResizeProvider
  ) {}

  processNewImage$(image: Image): Observable<void> {
    const smallResolution = getImageDimension(ImageDimensionType.Small);

    return this.imageTinifyProvider
      .tinifyImage$(image.storageId, image.fileName)
      .pipe(
        concatMap(() =>
          this.imageResizeProvider.resizeImage$(
            image.storageId,
            image.fileName,
            smallResolution
          )
        ),
        concatMap((filePath) => findImageResolution$(filePath)),
        concatMap((resolution) => {
          return from(this.entityModel.findById(image.entityId)).pipe(
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
        map(() => undefined)
      );
  }

  processImage$(
    image: Image,
    imageDimensionTypes: ImageDimensionType[]
  ): Observable<void> {
    return findEntityById$(image.entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        this.imageExifProvider.exifImage$(documentModel, image)
      ),
      concatMap(() => from(imageDimensionTypes)),
      concatMap((imageDimensionType) =>
        this.imageResizeProvider.resizeImage$(
          image.storageId,
          image.fileName,
          getImageDimension(imageDimensionType)
        )
      ),
      last(),
      map(() => undefined)
    );
  }
}
