/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs-extra';
import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';

import {
  ENV,
  ImageDimension,
  ImageDimensionAdd,
  ImageDimensionType,
  Media,
  ThreeSixtyImageSettings,
} from '@dark-rush-photography/shared/types';
import {
  Env,
  ImageDimensionConfig,
  IMAGE_DIMENSION_CONFIG,
} from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  toImageDimension,
  validateAddImageDimension,
} from '../content/image-dimension.functions';
import { AzureStorageProvider } from './azure-storage.provider';
import { BlobUploadCommonResponse } from '@azure/storage-blob';
import { resizeImage$ } from '@dark-rush-photography/api/util';

@Injectable()
export class ImageDimensionProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  validateType(imageDimensionType: ImageDimensionType): ImageDimensionConfig {
    const imageDimensionConfig = IMAGE_DIMENSION_CONFIG.find(
      (imageDimension) => imageDimension.type == imageDimensionType
    );
    if (!imageDimensionConfig)
      throw new BadRequestException(
        `Could not find image dimension config for image dimension type ${imageDimensionType}`
      );
    return imageDimensionConfig;
  }

  add$(
    entityId: string,
    imageId: string,
    imageDimensionAdd: ImageDimensionAdd,
    entityModel: Model<DocumentModel>
  ): Observable<ImageDimension> {
    const id = uuidv4();
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) => {
        const validatedDocumentModel = validateAddImageDimension(
          imageId,
          imageDimensionAdd,
          documentModel
        );
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            imageDimensions: [
              ...validatedDocumentModel.imageDimensions,
              { ...imageDimensionAdd, id, entityId, imageId },
            ],
          })
        );
      }),
      switchMapTo(this.findOne$(id, entityId, entityModel))
    );
  }

  updateThreeSixtyImageSettings$(
    id: string,
    entityId: string,
    threeSixtyImageSettings: ThreeSixtyImageSettings,
    entityModel: Model<DocumentModel>
  ): Observable<ImageDimension> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) => {
        const foundImageDimension = documentModel.imageDimensions.find(
          (imageDimension) => imageDimension.id === id
        );
        if (!foundImageDimension) throw new NotFoundException();

        return from(
          entityModel.findByIdAndUpdate(entityId, {
            imageDimensions: [
              ...documentModel.imageDimensions.filter(
                (imageDimension) => imageDimension.id !== id
              ),
              { ...foundImageDimension, threeSixtyImageSettings },
            ],
          })
        );
      }),
      switchMapTo(this.findOne$(id, entityId, entityModel))
    );
  }

  //TODO: findImageDimensionPixels$(filePath)
  resizeImage$(
    media: Media,
    isThreeSixtyImage: boolean
  ): Observable<BlobUploadCommonResponse> {
    return this.azureStorageProvider
      .downloadBlobToFile$(
        this.env.azureStorageConnectionString,
        this.azureStorageProvider.getAzureStorageType(media.state),
        this.azureStorageProvider.getBlobPath(media),
        media.fileName
      )
      .pipe(
        switchMap((filePath) => {
          const config = this.validateType(ImageDimensionType.Tile);
          return combineLatest([
            of(config),
            from(resizeImage$(media.fileName, filePath, config)),
          ]);
        }),
        switchMap(([config, filePath]) =>
          from(
            this.azureStorageProvider.uploadStreamToBlob$(
              this.env.azureStorageConnectionString,
              this.azureStorageProvider.getAzureStorageType(media.state),
              fs.createReadStream(filePath),
              this.azureStorageProvider.getBlobPathWithDimension(
                media,
                config.type
              )
            )
          )
        )
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
          throw new NotFoundException('Could not find image dimension');

        return toImageDimension(foundImageDimension);
      })
    );
  }

  findDataUri$ = (
    media: Media,
    imageDimensionType: ImageDimensionType
  ): Observable<string> => {
    return this.azureStorageProvider
      .downloadBlobAsBuffer$(
        this.env.azureStorageConnectionString,
        this.azureStorageProvider.getAzureStorageType(media.state),
        this.azureStorageProvider.getBlobPathWithDimension(
          media,
          imageDimensionType
        )
      )
      .pipe(
        map((buffer) => {
          const datauri = require('datauri/parser');
          const parser = new datauri();
          return parser.format('.jpg', buffer).content;
        })
      );
  };
}
