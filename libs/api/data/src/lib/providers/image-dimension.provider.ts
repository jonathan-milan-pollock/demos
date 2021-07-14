/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs-extra';
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { combineLatest, from, Observable, of } from 'rxjs';
import { concatMap, concatMapTo, map, tap } from 'rxjs/operators';

import {
  ImageDimension,
  ImageDimensionAdd,
  ImageDimensionType,
  Media,
  ThreeSixtyImageSettings,
} from '@dark-rush-photography/shared/types';
import { Env, ImageResolution } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';

import {
  findImageResolution$,
  resizeImage$,
} from '@dark-rush-photography/api/util';
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  toImageDimension,
  validateAddImageDimension,
  validateFoundImage,
} from '../content/image-dimension.functions';
import {
  downloadBlobAsBuffer$,
  downloadBlobToFile$,
  getAzureStorageTypeFromMediaState,
  getBlobPath,
  getBlobPathWithDimension,
  uploadStreamToBlob$,
} from '@dark-rush-photography/shared-server/util';

@Injectable()
export class ImageDimensionProvider {
  constructor(private readonly configService: ConfigService<Env>) {}

  add$(
    id: string,
    entityId: string,
    imageId: string,
    imageDimensionAdd: ImageDimensionAdd,
    entityModel: Model<DocumentModel>
  ): Observable<ImageDimension> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateFoundImage(imageId, documentModel)),
      map((documentModel) =>
        validateAddImageDimension(imageId, imageDimensionAdd, documentModel)
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
                pixels: imageDimensionAdd.pixels,
                threeSixtyImageSettings: { pitch: 0, yaw: 0, hfov: 0 },
              },
            ],
          })
        );
      }),
      concatMapTo(this.findOne$(id, entityId, entityModel))
    );
  }

  updateThreeSixtyImageSettings$(
    imageId: string,
    entityId: string,
    imageDimensionType: ImageDimensionType,
    threeSixtyImageSettings: ThreeSixtyImageSettings,
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
                  pixels: foundImageDimension.pixels,
                  threeSixtyImageSettings: threeSixtyImageSettings,
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

  resize$(
    media: Media,
    imageResolution: ImageResolution,
    entityModel: Model<DocumentModel>
  ): Observable<ImageDimension> {
    const id = uuidv4();
    Logger.log(`Resizing image dimension ${imageResolution.type}`);
    return downloadBlobToFile$(
      this.configService.get<Env>('privateBlobConnectionString', {
        infer: true,
      }),
      getAzureStorageTypeFromMediaState(media.state),
      getBlobPath(media),
      media.fileName
    ).pipe(
      concatMap((filePath) =>
        combineLatest([
          of(imageResolution),
          resizeImage$(media.fileName, filePath, imageResolution),
        ])
      ),
      concatMap(([imageResolution, filePath]) =>
        combineLatest([
          of(imageResolution),
          of(filePath),
          uploadStreamToBlob$(
            this.configService.get<Env>('privateBlobConnectionString', {
              infer: true,
            }),
            getAzureStorageTypeFromMediaState(media.state),
            fs.createReadStream(filePath),
            getBlobPathWithDimension(media, imageResolution.type)
          ),
        ])
      ),
      tap(() => Logger.log(`Finding image resolution ${imageResolution.type}`)),
      concatMap(([imageResolution, filePath]) =>
        combineLatest([of(imageResolution), findImageResolution$(filePath)])
      ),
      tap(() => Logger.log(`Adding image dimension ${imageResolution.type}`)),
      concatMap(([imageResolution, pixels]) =>
        this.add$(
          id,
          media.entityId,
          media.id,
          {
            type: imageResolution.type,
            pixels,
          },
          entityModel
        )
      ),
      tap(() =>
        Logger.log(`Resizing image dimension ${imageResolution.type} complete`)
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
    return downloadBlobAsBuffer$(
      this.configService.get<Env>('privateBlobConnectionString', {
        infer: true,
      }),
      getAzureStorageTypeFromMediaState(media.state),
      getBlobPathWithDimension(media, imageDimensionType)
    ).pipe(
      map((buffer) => {
        const datauri = require('datauri/parser');
        const parser = new datauri();
        return parser.format('.jpg', buffer).content;
      })
    );
  };
}
