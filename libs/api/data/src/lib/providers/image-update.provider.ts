import * as fs from 'fs-extra';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Model } from 'mongoose';
import { combineLatest, from, Observable, of } from 'rxjs';
import { concatMap, concatMapTo, mapTo } from 'rxjs/operators';

import {
  ImageUpdate,
  Image,
  ImageDimension,
  Media,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { ImageProvider } from './image.provider';
import {
  deleteBlob$,
  downloadBlobToFile$,
  getAzureStorageTypeFromMediaState,
  getBlobPath,
  getBlobPathWithDimension,
  uploadStreamToBlob$,
} from '@dark-rush-photography/shared-server/util';

@Injectable()
export class ImageUpdateProvider {
  constructor(
    private readonly configService: ConfigService<Env>,
    private readonly imageProvider: ImageProvider
  ) {}

  update$(
    image: Image,
    imageUpdate: ImageUpdate,
    documentModel: DocumentModel,
    entityModel: Model<DocumentModel>
  ): Observable<Media> {
    return this.imageProvider
      .setIsProcessing$(image.id, image.entityId, true, entityModel)
      .pipe(
        concatMapTo(
          this.updateBlobPath$(
            image,
            imageUpdate,
            this.imageProvider.getMedia(
              image.id,
              image.fileName,
              image.state,
              documentModel
            ),
            this.imageProvider.getMedia(
              image.id,
              imageUpdate.fileName,
              imageUpdate.state,
              documentModel
            ),
            documentModel.imageDimensions
          )
        ),
        concatMapTo(
          this.imageProvider.update$(
            image.id,
            image.entityId,
            imageUpdate,
            entityModel
          )
        ),
        concatMapTo(
          this.imageProvider.setIsProcessing$(
            image.id,
            image.entityId,
            false,
            entityModel
          )
        ),
        mapTo(
          this.imageProvider.getMedia(
            image.id,
            imageUpdate.fileName,
            imageUpdate.state,
            documentModel
          )
        )
      );
  }

  setIsProcessing$(
    id: string,
    entityId: string,
    isProcessing: boolean,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return this.imageProvider.setIsProcessing$(
      id,
      entityId,
      isProcessing,
      entityModel
    );
  }

  updateBlobPath$ = (
    image: Image,
    imageUpdate: ImageUpdate,
    imageMedia: Media,
    imageUpdateMedia: Media,
    imageDimensions: ImageDimension[]
  ): Observable<Image> => {
    if (
      image.fileName === imageUpdate.fileName &&
      image.state === imageUpdate.state
    )
      return of(image);

    return from(imageDimensions).pipe(
      concatMap((imageDimension) =>
        combineLatest([
          of(imageDimension),
          downloadBlobToFile$(
            this.configService.get<Env>('privateBlobConnectionString', {
              infer: true,
            }),
            getAzureStorageTypeFromMediaState(imageMedia.state),
            getBlobPathWithDimension(imageMedia, imageDimension.type),
            imageMedia.fileName
          ),
        ])
      ),
      concatMap(([imageDimension, filePath]) => {
        return combineLatest([
          of(imageDimension),
          uploadStreamToBlob$(
            this.configService.get<Env>('privateBlobConnectionString', {
              infer: true,
            }),
            getAzureStorageTypeFromMediaState(imageUpdateMedia.state),
            fs.createReadStream(filePath),
            getBlobPathWithDimension(imageUpdateMedia, imageDimension.type)
          ),
        ]);
      }),
      concatMap(([imageDimension]) =>
        deleteBlob$(
          this.configService.get<Env>('privateBlobConnectionString', {
            infer: true,
          }),
          getAzureStorageTypeFromMediaState(imageMedia.state),
          getBlobPathWithDimension(imageMedia, imageDimension.type)
        )
      ),
      concatMapTo(
        downloadBlobToFile$(
          this.configService.get<Env>('privateBlobConnectionString', {
            infer: true,
          }),
          getAzureStorageTypeFromMediaState(imageMedia.state),
          getBlobPath(imageMedia),
          imageMedia.fileName
        )
      ),
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configService.get<Env>('privateBlobConnectionString', {
            infer: true,
          }),
          getAzureStorageTypeFromMediaState(imageUpdateMedia.state),
          fs.createReadStream(filePath),
          getBlobPath(imageUpdateMedia)
        )
      ),
      concatMapTo(
        deleteBlob$(
          this.configService.get<Env>('privateBlobConnectionString', {
            infer: true,
          }),
          getAzureStorageTypeFromMediaState(imageMedia.state),
          getBlobPath(imageMedia)
        )
      ),
      mapTo(image)
    );
  };

  updateExif = (image: Image, imageUpdate: ImageUpdate): Observable<Image> => {
    //if (image.title !== imageUpdate.title)
    // get this comparison from the exif file
    return of(image);
  };
}
