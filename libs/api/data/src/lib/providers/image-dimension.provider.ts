/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs-extra';
import { Injectable, NotFoundException, Logger } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import {
  combineLatest,
  concatMap,
  concatMapTo,
  from,
  map,
  mapTo,
  Observable,
  of,
  tap,
} from 'rxjs';

import {
  ImageDimension,
  ImageDimensionType,
  Image,
  Location,
  ThreeSixtySettings,
  ImageDimensionAddDto,
  ImageUpdateDto,
  ImageResolution,
} from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/shared-server/types';
import { DocumentModel } from '../schema/document.schema';
//import {
//  findImageResolution$,
//  resizeImage$,
//} from '@dark-rush-photography/api/util';
import {
  deleteBlob$,
  downloadBlobAsBuffer$,
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithDimension,
  uploadStreamToBlob$,
} from '@dark-rush-photography/shared-server/util';
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  validateImageDimensionNotAlreadyExists,
  validateImageDocumentModelFound,
} from '../content/image-validation.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageDimensionProvider {
  private readonly logger: Logger;

  constructor(private readonly configProvider: ConfigProvider) {
    this.logger = new Logger(ImageDimensionProvider.name);
  }

  add$(
    id: string,
    entityId: string,
    imageId: string,
    imageDimensionAdd: ImageDimensionAddDto,
    entityModel: Model<DocumentModel>
  ): Observable<ImageDimension> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        return validateImageDocumentModelFound(imageId, documentModel);
      }),
      map((documentModel) =>
        validateImageDimensionNotAlreadyExists(
          imageId,
          imageDimensionAdd.type,
          documentModel
        )
      ),
      concatMap((documentModel) => {
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            imageDimensions: [
              ...documentModel.imageDimensions,
              {
                id,
                entityId,
                imageId,
                type: imageDimensionAdd.type,
                resolution: imageDimensionAdd.resolution,
                threeSixtySettings: { pitch: 0, yaw: 0, hfov: 0 },
              },
            ],
          })
        );
      }),
      concatMapTo(this.findOne$(id, entityId, entityModel))
    );
  }

  updateThreeSixtySettings$(
    imageId: string,
    entityId: string,
    imageDimensionType: ImageDimensionType,
    threeSixtySettings: ThreeSixtySettings,
    entityModel: Model<DocumentModel>
  ): Observable<ImageDimension> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const foundImageDimension = documentModel.imageDimensions.find(
          (imageDimension) =>
            imageDimension.imageId === imageId &&
            imageDimension.type === imageDimensionType
        );
        if (!foundImageDimension) throw new NotFoundException();

        return combineLatest([
          of(foundImageDimension),
          from(
            entityModel.findByIdAndUpdate(entityId, {
              imageDimensions: [
                ...documentModel.imageDimensions.filter(
                  (imageDimension) => imageDimension.type !== imageDimensionType
                ),
                {
                  id: foundImageDimension.id,
                  entityId: foundImageDimension.entityId,
                  imageId: foundImageDimension.imageId,
                  type: foundImageDimension.type,
                  resolution: foundImageDimension.resolution,
                  threeSixtySettings: threeSixtySettings,
                },
              ],
            })
          ),
        ]);
      }),
      concatMap(([foundImageDimension]) =>
        this.findOne$(foundImageDimension.id, entityId, entityModel)
      )
    );
  }

  updateBlobPath$(
    image: Image,
    imageUpdate: ImageUpdateDto,
    imageMedia: Media,
    imageUpdateMedia: Media,
    imageDimension: ImageDimension,
    location?: Location
  ): Observable<boolean> {
    return downloadBlobToFile$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      getAzureStorageBlobPathWithDimension(imageMedia, imageDimension.type),
      imageMedia.fileName
    ).pipe(
      tap(() =>
        this.logger.debug(
          `Exif image dimension ${imageDimension.type} with update`
        )
      ),
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
          getAzureStorageBlobPathWithDimension(
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
          getAzureStorageBlobPathWithDimension(imageMedia, imageDimension.type)
        )
      ),
      mapTo(true)
    );
  }

  resize$(
    media: Media,
    imageResolution: ImageResolution,
    entityModel: Model<DocumentModel>
  ): Observable<string> {
    const id = uuidv4();
    return downloadBlobToFile$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      getAzureStorageBlobPath(media),
      media.fileName
    ).pipe(
      tap(() =>
        this.logger.log(
          `Resizing ${imageResolution.type} image ${media.fileName}`
        )
      )
      /* concatMap((filePath) =>
        resizeImage$(media.fileName, filePath, imageResolution)
      ),
      concatMap((filePath) =>
        combineLatest([
          of(filePath),
          uploadStreamToBlob$(
            this.configProvider.azureStorageConnectionStringBlobs,
            fs.createReadStream(filePath),
            getAzureStorageBlobPathWithDimension(media, imageResolution.type)
          ),
        ])
      ),
      concatMap(([filePath]) => findImageResolution$(filePath)),
      tap(() =>
        this.logger.log(
          `Adding ${imageResolution.type} image dimension ${media.fileName}`
        )
      ),
      concatMap((resolution) =>
        this.add$(
          id,
          media.entityId,
          media.id,
          {
            type: imageResolution.type,
            resolution,
          },
          entityModel
        )
      )*/
    );
  }

  findOne$(
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<ImageDimension> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        const foundImageDimension = documentModel.imageDimensions.find(
          (imageDimension) => imageDimension.id == id
        );
        if (!foundImageDimension)
          throw new NotFoundException(`Could not find image dimension ${id}`);

        return loadImageDimension(foundImageDimension);
      })
    );
  }
}
