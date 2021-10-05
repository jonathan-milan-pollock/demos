import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Image, ImageDimensionType } from '@dark-rush-photography/shared/types';
import {
  getImageDimension,
  findImageResolution$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { imageResize$ } from '../content/image-resize.functions';
import { updateSmallImageDimension$ } from '../content/image-update.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageProcessProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  processNewImage$(image: Image): Observable<Image> {
    const smallResolution = getImageDimension(ImageDimensionType.Small);

    return imageResize$(
      image.storageId,
      image.fileName,
      smallResolution,
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      concatMap((filePath) => findImageResolution$(filePath)),
      concatMap((resolution) =>
        updateSmallImageDimension$(
          image.id,
          image.entityId,
          resolution,
          this.entityModel
        )
      ),
      map(() => image)
    );
  }

  processImage$(image: Image): Observable<Image> {
    const smallResolution = getImageDimension(ImageDimensionType.Small);

    return imageResize$(
      image.storageId,
      image.fileName,
      smallResolution,
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      concatMap((filePath) => findImageResolution$(filePath)),
      concatMap((smallResolution) =>
        updateSmallImageDimension$(
          image.id,
          image.entityId,
          smallResolution,
          this.entityModel
        )
      ),
      map(() => image)
    );
  }
}
