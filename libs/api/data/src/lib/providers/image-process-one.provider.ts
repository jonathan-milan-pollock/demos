import * as fs from 'fs-extra';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  Entity,
  Image,
  ImageDimension,
  ImageDimensionType,
  IMAGE_FILE_EXTENSION,
  IMAGE_MIME_TYPE,
} from '@dark-rush-photography/shared/types';
import {
  downloadAzureStorageBlobToFile$,
  findDimension$,
  getAzureStorageBlobPath,
  getImageDimension,
  getImageFileName,
  uploadAzureStorageStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  updateImageCreatedDate$,
  updateImageSmallDimension$,
} from '../images/image-repository.functions';
import { validateImageFound } from '../images/image-validation.functions';
import { ImageExifProvider } from './image-exif.provider';
import { ImageTinifyProvider } from './image-tinify.provider';
import { ImageResizeProvider } from './image-resize.provider';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageProcessOneProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
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
            this.imageTinifyProvider.tinifyImage$(image.storageId, image.slug)
          ),
          concatMap(() => from(iPadImageDimensions)),
          concatMap((iPadImageDimension) =>
            this.imageResizeProvider.resizeImage$(
              image.storageId,
              image.slug,
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

    return downloadAzureStorageBlobToFile$(
      getAzureStorageBlobPath(
        image.storageId,
        image.slug,
        IMAGE_FILE_EXTENSION
      ),
      getImageFileName(image.slug),
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      concatMap((filePath) =>
        uploadAzureStorageStreamToBlob$(
          fs.createReadStream(filePath),
          IMAGE_MIME_TYPE,
          getAzureStorageBlobPath(
            image.storageId,
            image.slug,
            IMAGE_FILE_EXTENSION
          ),
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic
        )
      ),
      concatMap(() => this.imageExifProvider.exifImage$(image, entity)),
      concatMap(() =>
        this.imageResizeProvider.resizeImage$(
          image.storageId,
          image.slug,
          smallImageDimension
        )
      ),
      concatMap((filePath) => findDimension$(filePath)),
      concatMap((dimension) => {
        return findEntityById$(image.entityId, this.entityModel).pipe(
          map(validateEntityFound),
          concatMap((documentModel) => {
            const foundImage = validateImageFound(
              image.id,
              documentModel.images
            );
            return updateImageSmallDimension$(
              foundImage,
              dimension,
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
          image.slug,
          imageDimension
        )
      ),
      map(() => undefined)
    );
  }
}
