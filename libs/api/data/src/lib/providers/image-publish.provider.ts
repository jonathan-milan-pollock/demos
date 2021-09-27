import * as fs from 'fs-extra';
import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, map, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  ImageDimensionType,
  Media,
  ImageState,
} from '@dark-rush-photography/shared/types';
import {
  getAzureStorageBlobPath,
  uploadStreamToBlob$,
  findImageResolution,
  findImageResolution$,
  getExifDate,
  downloadGoogleDriveImageFile,
} from '@dark-rush-photography/api/util';
import { DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { ImageDimensionProvider } from './image-dimension.provider';
import { ImageTinifyProvider } from './image-tinify.provider';
import { ImageResizeProvider } from './image-resize.provider';
import { ImageUpdateProvider } from './image-update.provider';

@Injectable()
export class ImagePublishProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly imageUpdateProvider: ImageUpdateProvider,
    private readonly tinifyImageProvider: ImageTinifyProvider,
    private readonly resizeImageProvider: ImageResizeProvider
  ) {
    this.logger = new Logger(ImagePublishProvider.name);
  }

  publishImages$(
    documentModel: DocumentModel,
    renameMediaWithEntitySlug: boolean
  ): Observable<void> {
    const imagesToPublish = documentModel.images.filter(
      (image) =>
        image.state === ImageState.Selected || image.state === ImageState.Public
    );
    if (imagesToPublish.length === 0) return of(undefined);

    return from(imagesToPublish).pipe(
      concatMap((imageToPublish) =>
        this.imageUpdateProvider.update$(imageToPublish, {
          fileName: renameMediaWithEntitySlug
            ? `${documentModel.slug}${path.extname(imageToPublish.fileName)}`
            : imageToPublish.fileName,
          order: imageToPublish.order,
          isStarred: imageToPublish.isStarred,
          isLoved: imageToPublish.isLoved,
          title: imageToPublish.title,
          seoDescription: imageToPublish.seoDescription,
          seoKeywords: imageToPublish.seoKeywords,
          dateCreated: imageToPublish.dateCreated,
          datePublished: new Date().toISOString(),
        })
      ),
      map(() => undefined)
    );
  }

  publishImage$(
    googleDrive: drive_v3.Drive,
    imageFileId: string,
    media: Media
  ): Observable<void> {
    const smallResolution = findImageResolution(ImageDimensionType.Small);
    const id = uuidv4();
    return from(downloadGoogleDriveImageFile(googleDrive, imageFileId)).pipe(
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          fs.createReadStream(filePath),
          getAzureStorageBlobPath(media.blobPathId, media.fileName)
        )
      ),
      concatMap(() => this.tinifyImageProvider.tinifyImage$(media)),
      concatMap(() => this.resizeImageProvider.resize$(media, smallResolution)),
      concatMap(([filePath]) => findImageResolution$(filePath)),
      concatMap((resolution) =>
        this.imageDimensionProvider.add$(
          id,
          media.id,
          media.entityId,
          smallResolution.type,
          resolution
        )
      ),
      map(() => undefined)
    );
  }
}
