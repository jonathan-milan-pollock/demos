import * as fs from 'fs-extra';
import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, map, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  ImageDimensionType,
  ImageState,
} from '@dark-rush-photography/shared/types';
import {
  getAzureStorageBlobPath,
  uploadStreamToBlob$,
  getImageDimension,
  downloadGoogleDriveImageFile,
} from '@dark-rush-photography/api/util';
import { DocumentModel } from '../schema/document.schema';
import { imageResize$ } from '../content/image-resize.functions';
import { tinifyImage$ } from '../content/image-tinify.functions';
import { ConfigProvider } from '../providers/config.provider';

@Injectable()
export class ImagePublishProvider {
  private readonly logger: Logger;
  constructor(private readonly configProvider: ConfigProvider) {
    this.logger = new Logger(ImagePublishProvider.name);
  }

  // changing the file name
  // setting to published
  // changing the blobs to pick up the slug name changes
  // processing the sizes of the images needed for the website (will do the resizing of the images for social media with social media post)

  publishImages$(
    documentModel: DocumentModel,
  ): Observable<void> {
    const imagesToPublish = documentModel.images.filter(
      (image) =>
        image.state === ImageState.Selected || image.state === ImageState.Public
    );
    if (imagesToPublish.length === 0) return of(undefined);

    // todo will need to add the order to the file name
    return from(imagesToPublish).pipe(
      concatMap((imageToPublish) =>
        this.imageUpdateProvider.update$(imageToPublish, {
          fileName: `${documentModel.slug}${path.extname(imageToPublish.fileName)}`,
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
