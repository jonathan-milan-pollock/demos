import * as fs from 'fs-extra';
import { Inject, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, switchMapTo } from 'rxjs/operators';

import {
  ImageUpdate,
  Image,
  ENV,
  ImageDimension,
  Media,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { ImageProvider } from './image.provider';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class ImageUpdateProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly imageProvider: ImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider
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
        switchMapTo(
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
        switchMapTo(
          this.imageProvider.update$(
            image.id,
            image.entityId,
            imageUpdate,
            entityModel
          )
        ),
        switchMapTo(
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
      switchMap((imageDimension) => {
        const downloadBlobToFile$ = this.azureStorageProvider.downloadBlobToFile$(
          this.env.azureStorageConnectionString,
          this.azureStorageProvider.getAzureStorageType(imageMedia.state),
          this.azureStorageProvider.getBlobPathWithDimension(
            imageMedia,
            imageDimension.type
          ),
          imageMedia.fileName
        );
        return combineLatest([of(imageDimension), from(downloadBlobToFile$)]);
      }),
      switchMap(([imageDimension, filePath]) => {
        const uploadStreamToBlob$ = this.azureStorageProvider.uploadStreamToBlob$(
          this.env.azureStorageConnectionString,
          this.azureStorageProvider.getAzureStorageType(imageUpdateMedia.state),
          fs.createReadStream(filePath),
          this.azureStorageProvider.getBlobPathWithDimension(
            imageUpdateMedia,
            imageDimension.type
          )
        );
        return combineLatest([of(imageDimension), from(uploadStreamToBlob$)]);
      }),
      switchMap(([imageDimension]) =>
        this.azureStorageProvider.deleteBlob$(
          this.env.azureStorageConnectionString,
          this.azureStorageProvider.getAzureStorageType(imageMedia.state),
          this.azureStorageProvider.getBlobPathWithDimension(
            imageMedia,
            imageDimension.type
          )
        )
      ),
      switchMapTo(
        this.azureStorageProvider.downloadBlobToFile$(
          this.env.azureStorageConnectionString,
          this.azureStorageProvider.getAzureStorageType(imageMedia.state),
          this.azureStorageProvider.getBlobPath(imageMedia),
          imageMedia.fileName
        )
      ),
      switchMap((filePath) =>
        this.azureStorageProvider.uploadStreamToBlob$(
          this.env.azureStorageConnectionString,
          this.azureStorageProvider.getAzureStorageType(imageUpdateMedia.state),
          fs.createReadStream(filePath),
          this.azureStorageProvider.getBlobPath(imageUpdateMedia)
        )
      ),
      switchMapTo(
        this.azureStorageProvider.deleteBlob$(
          this.env.azureStorageConnectionString,
          this.azureStorageProvider.getAzureStorageType(imageMedia.state),
          this.azureStorageProvider.getBlobPath(imageMedia)
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
