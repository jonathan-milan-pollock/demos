/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  ImageDimension,
  ImageDimensionType,
  ThreeSixtySettings,
  MediaResolution,
  Media,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  deleteBlob$,
  downloadBlobToFile$,
  getAzureStorageBlobPathWithDimension,
} from '@dark-rush-photography/api/util';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { validateImageDimensionNotAlreadyExists } from '../content/image-validation.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageDimensionProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(ImageDimensionProvider.name);
  }

  add$(
    id: string,
    imageId: string,
    entityId: string,
    type: ImageDimensionType,
    resolution: MediaResolution
  ): Observable<ImageDimension> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) =>
        validateImageDimensionNotAlreadyExists(imageId, type, documentModel)
      ),
      concatMap((documentModel) =>
        from(
          this.entityModel.findByIdAndUpdate(entityId, {
            imageDimensions: [
              ...documentModel.imageDimensions,
              {
                id,
                entityId,
                imageId,
                type: type,
                resolution,
                threeSixtySettings: { pitch: 0, yaw: 0, hfov: 0 },
              },
            ],
          })
        )
      ),
      concatMap(() => this.findOne$(id, entityId, this.entityModel))
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
    media: Media,
    updateMedia: Media,
    imageDimension: ImageDimension
  ): Observable<void> {
    return downloadBlobToFile$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      getAzureStorageBlobPathWithDimension(
        media.blobPathId,
        media.fileName,
        imageDimension.type
      ),
      media.fileName
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
          getAzureStorageBlobPathWithDimension(
            media.blobPathId,
            media.fileName,
            imageDimension.type
          )
        )
      ),
      map(() => undefined)
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
          (imageDimension) => imageDimension.id === id
        );
        if (!foundImageDimension)
          throw new NotFoundException(`Could not find image dimension ${id}`);

        return loadImageDimension(foundImageDimension);
      })
    );
  }
}
