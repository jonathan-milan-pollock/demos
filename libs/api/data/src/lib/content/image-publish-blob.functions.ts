import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  Image,
  ImageDimension,
  ImageDimensionType,
  ImageUpdate,
} from '@dark-rush-photography/shared/types';
import {
  deleteBlob$,
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithImageDimension,
  uploadStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageUpdateBlobProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider
  ) {
    this.logger = new Logger(ImageUpdateBlobProvider.name);
  }

  updateImageBlobPath$(
    image: Image,
    imageUpdate: ImageUpdate,
    imageDimensionTypes: ImageDimensionType[]
  ): Observable<void> {
    downloadBlobToFile$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      getAzureStorageBlobPath(image.storageId, image.fileName),
      image.fileName
    ).pipe(
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          fs.createReadStream(filePath),
          getAzureStorageBlobPath(image.storageId, imageUpdate.fileName)
        )
      ),
      concatMap(() =>
        deleteBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          getAzureStorageBlobPath(image.storageId, image.fileName)
        )
      ),
      concatMap(() => {
        if (imageDimensions.length === 0) return of(undefined);

        return from(imageDimensions).pipe(
          concatMap((imageDimension) =>
            updateBlobPath$(image, imageUpdate, imageDimension)
          )
        );
      })
    );
  }

  updateImageBlobPath2$(
    image: Image,
    imageUpdate: ImageUpdate,
    imageDimensionTypes: ImageDimensionType[]
  ): Observable<void> {
    return downloadBlobToFile$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      getAzureStorageBlobPath(image.storageId, image.fileName),
      image.fileName
    ).pipe(
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          fs.createReadStream(filePath),
          getAzureStorageBlobPath(image.storageId, imageUpdate.fileName)
        )
      ),
      concatMap(() =>
        deleteBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          getAzureStorageBlobPath(image.storageId, image.fileName)
        )
      ),
      concatMap(() => {
        if (imageDimensions.length === 0) return of(undefined);

        return from(imageDimensions).pipe(
          concatMap((imageDimension) =>
            this.imageDimensionProvider.updateBlobPath$(
              image,
              imageUpdate,
              imageDimension
            )
          )
        );
      })
    );
  }

  updateBlobPath$(
    image: Image,
    imageUpdate: ImageUpdate,
    imageUpdateBlobPathId: string,
    imageDimensions: ImageDimension[]
  ): Observable<void> {
    downloadBlobToFile$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      getAzureStorageBlobPath(image.storageId, image.fileName),
      image.fileName
    ).pipe(
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          fs.createReadStream(filePath),
          getAzureStorageBlobPath(imageUpdateBlobPathId, imageUpdate.fileName)
        )
      ),
      concatMap(() => {
        if (imageDimensions.length === 0) return of(undefined);

        return from(imageDimensions).pipe(
          concatMap((imageDimension) =>
            this.imageDimensionProvider.updateBlobPath$(
              image,
              imageUpdate,
              imageDimension
            )
          )
        );
      })
    );
  }

  updateImageDimensionBlobPath$(
    image: Image,
    imageUpdate: ImageUpdate,
    imageDimension: ImageDimension
  ): Observable<void> {
    return downloadBlobToFile$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      getAzureStorageBlobPathWithImageDimension(
        image.storageId,
        image.fileName,
        imageDimension.type
      ),
      image.fileName
    ).pipe(
      /*
      tap(() =>
        this.logger.debug(
          `Upload image dimension ${imageDimension.type} to new blob path`
        )
      ),
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.azureStorageConnectionStringBlobs(
            imageUpdateMedia.state
          ),
          fs.createReadStream(filePath),
          getAzureStorageBlobPathWithDimensionType(
            imageUpdateMedia,
            imageDimension.type
          )
        )
      ),
      tap(() =>
        this.logger.debug(
          `Remove image dimension ${imageDimension.type} at previous blob path`
        )
      ),*/
      concatMap(() =>
        deleteBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          getAzureStorageBlobPathWithImageDimension(
            image.storageId,
            image.fileName,
            imageDimension.type
          )
        )
      ),
      map(() => undefined)
    );
  }
}


publishImage$(
  googleDrive: drive_v3.Drive,
  imageFileId: string,
  imageId: string,
  entityId: string,
  storageId: string,
  fileName: string
): Observable<void> {
  const smallResolution = findImageResolution(ImageDimensionType.Small);
  const id = uuidv4();
  return from(downloadGoogleDriveImageFile(googleDrive, imageFileId)).pipe(
    concatMap((filePath) =>
      uploadStreamToBlob$(
        this.configProvider.azureStorageConnectionStringPublic,
        this.configProvider.azureStorageBlobContainerNamePublic,
        fs.createReadStream(filePath),
        getAzureStorageBlobPath(storageId, fileName)
      )
    ),
    concatMap(() =>
      tinifyImage$(
        storageId,
        fileName,
        this.configProvider.azureStorageConnectionStringPublic,
        this.configProvider.azureStorageBlobContainerNamePublic,
        this.configProvider.tinyPngApiKey
      )
    ),
    concatMap(() =>
      imageResize$(
        storageId,
        fileName,
        smallResolution,
        this.configProvider.azureStorageConnectionStringPublic,
        this.configProvider.azureStorageBlobContainerNamePublic
      )
    ),
    concatMap(([filePath]) => findImageResolution$(filePath)),
    concatMap((resolution) =>
      this.imageDimensionProvider.add$(
        id,
        imageId,
        entityId,
        smallResolution.type,
        resolution
      )
    ),
    map(() => undefined)
  );
}
}
