import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Observable, tap, concatMap, map } from 'rxjs';
import { Model } from 'mongoose';

import { Image, IMAGE_MIME_TYPE } from '@dark-rush-photography/shared/types';
import {
  downloadAzureStorageBlobToFile$,
  exifImage$,
  getAzureStorageBlobPath,
  loadImageExif,
  uploadAzureStorageStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  validateEntitySeoDescription,
  validateEntitySeoKeywords,
  validateEntityTitle,
} from '../entities/entity-field-validation.functions';
import {
  validateImageDateCreated,
  validateImageDatePublished,
} from '../content/content-field-validation.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageExifProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(ImageExifProvider.name);
  }

  findExifDate$(): string {
    return '';
  }

  exifImage$(entity: DocumentModel, image: Image): Observable<string> {
    validateEntitySeoKeywords(entity);
    const imageExif = loadImageExif(
      entity.location,
      validateImageDateCreated(image),
      validateImageDatePublished(image),
      validateEntityTitle(entity),
      validateEntitySeoDescription(entity),
      validateEntitySeoKeywords(entity),
      new Date().getFullYear()
    );
    return downloadAzureStorageBlobToFile$(
      getAzureStorageBlobPath(image.storageId, image.fileName),
      image.fileName,
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      tap(() => this.logger.log(`Exif image ${image.fileName}`)),
      concatMap((filePath) =>
        exifImage$(filePath, imageExif).pipe(
          concatMap(() =>
            uploadAzureStorageStreamToBlob$(
              fs.createReadStream(filePath),
              IMAGE_MIME_TYPE,
              getAzureStorageBlobPath(image.storageId, image.fileName),
              this.configProvider.azureStorageConnectionStringPublic,
              this.configProvider.azureStorageBlobContainerNamePublic
            )
          ),
          map(() => filePath)
        )
      )
    );
  }
}
