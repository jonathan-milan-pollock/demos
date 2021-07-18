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
} from '@dark-rush-photography/shared/types';
import { ImageResolution, Media } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  deleteBlob$,
  downloadBlobAsBuffer$,
  downloadBlobToFile$,
  exifImage$,
  findImageResolution$,
  getBlobPath,
  getBlobPathWithDimension,
  getExifDate,
  getImageExif,
  resizeImage$,
  uploadStreamToBlob$,
} from '@dark-rush-photography/api/util';
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
      map((documentModel) =>
        validateImageDocumentModelFound(imageId, documentModel)
      ),
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

  updateBlobPathAndExif$(
    image: Image,
    imageUpdate: ImageUpdateDto,
    imageMedia: Media,
    imageUpdateMedia: Media,
    imageDimension: ImageDimension,
    location?: Location
  ): Observable<boolean> {
    return downloadBlobToFile$(
      this.configProvider.getConnectionStringFromMediaState(imageMedia.state),
      getBlobPathWithDimension(imageMedia, imageDimension.type),
      imageMedia.fileName
    ).pipe(
      tap(() =>
        this.logger.debug(
          `Exif image dimension ${imageDimension.type} with update`
        )
      ),
      concatMap((filePath) =>
        exifImage$(
          filePath,
          this.configProvider.getImageArtistExif(
            new Date().getFullYear(),
            image.dateCreated ?? getExifDate(new Date())
          ),
          getImageExif(
            imageUpdate.datePublished ?? getExifDate(new Date()),
            imageUpdate.title,
            imageUpdate.description,
            imageUpdate.keywords,
            location
          )
        )
      ),
      tap(() =>
        this.logger.debug(
          `Upload image dimension ${imageDimension.type} to new blob path`
        )
      ),
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.getConnectionStringFromMediaState(
            imageUpdateMedia.state
          ),
          fs.createReadStream(filePath),
          getBlobPathWithDimension(imageUpdateMedia, imageDimension.type)
        )
      ),
      tap(() =>
        this.logger.debug(
          `Remove image dimension ${imageDimension.type} at previous blob path`
        )
      ),
      concatMap(() =>
        deleteBlob$(
          this.configProvider.getConnectionStringFromMediaState(
            imageMedia.state
          ),
          getBlobPathWithDimension(imageMedia, imageDimension.type)
        )
      ),
      mapTo(true)
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
      this.configProvider.getConnectionStringFromMediaState(media.state),
      getBlobPath(media),
      media.fileName
    ).pipe(
      concatMap((filePath) =>
        resizeImage$(media.fileName, filePath, imageResolution)
      ),
      concatMap((filePath) =>
        combineLatest([
          of(filePath),
          uploadStreamToBlob$(
            this.configProvider.getConnectionStringFromMediaState(media.state),
            fs.createReadStream(filePath),
            getBlobPathWithDimension(media, imageResolution.type)
          ),
        ])
      ),
      tap(() => Logger.log(`Finding image resolution ${imageResolution.type}`)),
      concatMap(([filePath]) => findImageResolution$(filePath)),
      tap(() => Logger.log(`Adding image dimension ${imageResolution.type}`)),
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

        return loadImageDimension(foundImageDimension);
      })
    );
  }

  findDataUri$(
    media: Media,
    imageDimensionType: ImageDimensionType
  ): Observable<string> {
    return downloadBlobAsBuffer$(
      this.configProvider.getConnectionStringFromMediaState(media.state),
      getBlobPathWithDimension(media, imageDimensionType)
    ).pipe(
      map((buffer) => {
        const datauri = require('datauri/parser');
        const parser = new datauri();
        return parser.format('.jpg', buffer).content;
      })
    );
  }
}
