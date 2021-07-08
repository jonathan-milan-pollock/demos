import * as fs from 'fs-extra';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { BlobUploadCommonResponse } from '@azure/storage-blob';
import * as tinify from 'tinify';
import { Model } from 'mongoose';
import { combineLatest, forkJoin, from, Observable, of } from 'rxjs';
import { concatMap, concatMapTo, map, tap } from 'rxjs/operators';

import {
  ENV,
  ImageDimensionType,
  Media,
} from '@dark-rush-photography/shared/types';
import { AzureStorageType } from '@dark-rush-photography/shared-server/types';
import {
  Env,
  findImageResolution,
  findThreeSixtyImageResolution,
} from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  exifImageArtist$,
  findExifDateCreated$,
} from '@dark-rush-photography/api/util';
import { ImageProvider } from './image.provider';
import { ImageDimensionProvider } from './image-dimension.provider';
import {
  downloadBlobToFile$,
  getBlobPath,
  uploadBufferToBlob$,
  uploadStreamToBlob$,
} from '@dark-rush-photography/shared-server/util';

@Injectable()
export class ImageUploadProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider
  ) {}

  upload$(
    media: Media,
    isThreeSixtyImage: boolean,
    file: Express.Multer.File,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    const tileResolution = isThreeSixtyImage
      ? findThreeSixtyImageResolution(ImageDimensionType.ThreeSixtyTile)
      : findImageResolution(ImageDimensionType.Tile);
    const smallResolution = isThreeSixtyImage
      ? findThreeSixtyImageResolution(ImageDimensionType.Small)
      : findImageResolution(ImageDimensionType.Small);

    return uploadBufferToBlob$(
      this.env.azureStorageConnectionString,
      AzureStorageType.Private,
      file.buffer,
      getBlobPath(media)
    ).pipe(
      tap(() => Logger.log('Update date created', ImageUploadProvider.name)),
      concatMapTo(this.updateDateCreated$(media, entityModel)),
      tap(() => Logger.log('Tinify image', ImageUploadProvider.name)),
      concatMap((dateCreated) =>
        combineLatest([of(dateCreated), from(this.tinifyImage$(media))])
      ),
      tap(() => Logger.log('Exif image', ImageUploadProvider.name)),
      concatMap(([dateCreated]) => this.exifImageArtist$(media, dateCreated)),
      tap(() => Logger.log('Resize image', ImageUploadProvider.name)),
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
      this.env.azureStorageConnectionString,
      AzureStorageType.Private,
      getBlobPath(media),
      media.fileName
    ).pipe(
      concatMap((filePath) => findExifDateCreated$(filePath, new Date())),
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
      this.env.azureStorageConnectionString,
      AzureStorageType.Private,
      getBlobPath(media),
      media.fileName
    ).pipe(
      concatMap((filePath) => {
        tinify.default.key = this.env.tinyPngApiKey;
        return from(tinify.fromFile(filePath).toBuffer());
      }),
      concatMap((uint8Array) =>
        uploadBufferToBlob$(
          this.env.azureStorageConnectionString,
          AzureStorageType.Private,
          Buffer.from(uint8Array),
          getBlobPath(media)
        )
      )
    );
  }

  exifImageArtist$(
    media: Media,
    dateCreated: string
  ): Observable<BlobUploadCommonResponse> {
    return downloadBlobToFile$(
      this.env.azureStorageConnectionString,
      AzureStorageType.Private,
      getBlobPath(media),
      media.fileName
    ).pipe(
      concatMap((filePath) => {
        const date = new Date();
        return exifImageArtist$(filePath, date.getFullYear(), dateCreated);
      }),
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.env.azureStorageConnectionString,
          AzureStorageType.Private,
          fs.createReadStream(filePath),
          getBlobPath(media)
        )
      )
    );
  }
}
