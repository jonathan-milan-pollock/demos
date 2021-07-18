import { Injectable, Logger } from '@nestjs/common';

import { BlobUploadCommonResponse } from '@azure/storage-blob';
import * as tinify from 'tinify';
import { Model } from 'mongoose';
import {
  combineLatest,
  concatMap,
  concatMapTo,
  forkJoin,
  from,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';

import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  downloadBlobToFile$,
  findImageExifDateCreated$,
  getBlobPath,
  uploadBufferToBlob$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { ImageDimensionProvider } from './image-dimension.provider';
import { ImageProvider } from './image.provider';

@Injectable()
export class ImageUploadProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider
  ) {
    this.logger = new Logger(ImageUploadProvider.name);
  }

  upload$(
    media: Media,
    isThreeSixty: boolean,
    file: Express.Multer.File,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    const tileResolution = isThreeSixty
      ? this.configProvider.findThreeSixtyImageResolution(
          ImageDimensionType.ThreeSixtyTile
        )
      : this.configProvider.findImageResolution(ImageDimensionType.Tile);
    const smallResolution = isThreeSixty
      ? this.configProvider.findThreeSixtyImageResolution(
          ImageDimensionType.ThreeSixtySmall
        )
      : this.configProvider.findImageResolution(ImageDimensionType.Small);

    return uploadBufferToBlob$(
      this.configProvider.getConnectionStringFromMediaState(media.state),
      file.buffer,
      getBlobPath(media)
    ).pipe(
      tap(() => this.logger.debug('Update date image created')),
      concatMapTo(this.updateDateCreated$(media, entityModel)),
      tap(() => this.logger.debug('Tinify image')),
      concatMapTo(this.tinifyImage$(media)),
      tap(() => this.logger.debug('Resize image')),
      concatMapTo(
        forkJoin([
          this.imageDimensionProvider.resize$(
            media,
            tileResolution,
            entityModel
          ),
          this.imageDimensionProvider.resize$(
            media,
            smallResolution,
            entityModel
          ),
        ])
      ),
      concatMapTo(
        this.imageProvider.setIsProcessing$(
          media.id,
          media.entityId,
          false,
          entityModel
        )
      )
    );
  }

  updateDateCreated$(
    media: Media,
    entityModel: Model<DocumentModel>
  ): Observable<string> {
    return downloadBlobToFile$(
      this.configProvider.getConnectionStringFromMediaState(media.state),
      getBlobPath(media),
      media.fileName
    ).pipe(
      concatMap((filePath) => findImageExifDateCreated$(filePath, new Date())),
      concatMap((dateCreated) =>
        combineLatest([
          of(dateCreated),
          this.imageProvider.setDateCreated$(
            media.id,
            media.entityId,
            dateCreated,
            entityModel
          ),
        ])
      ),
      map(([dateCreated]) => dateCreated)
    );
  }

  tinifyImage$(media: Media): Observable<BlobUploadCommonResponse> {
    return downloadBlobToFile$(
      this.configProvider.getConnectionStringFromMediaState(media.state),
      getBlobPath(media),
      media.fileName
    ).pipe(
      concatMap((filePath) => {
        tinify.default.key = this.configProvider.tinyPngApiKey;
        return from(tinify.fromFile(filePath).toBuffer());
      }),
      concatMap((uint8Array) =>
        uploadBufferToBlob$(
          this.configProvider.getConnectionStringFromMediaState(media.state),
          Buffer.from(uint8Array),
          getBlobPath(media)
        )
      )
    );
  }
}
