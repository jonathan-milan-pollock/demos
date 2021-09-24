import * as fs from 'fs-extra';
import { join } from 'path';
import { Injectable, Logger, StreamableFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { combineLatest, concatMap, from, map, Observable, of, tap } from 'rxjs';
import { Model } from 'mongoose';

import {
  Image,
  ImageDimensionType,
  MediaState,
  ThreeSixtySettings,
} from '@dark-rush-photography/shared/types';
import { ImageUpdateDto } from '@dark-rush-photography/api/types';
import { getGoogleDrive } from '@dark-rush-photography/api/util';
import {
  ConfigProvider,
  Document,
  DocumentModel,
  ImageDimensionProvider,
  ImageLoadNewProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUpdateProvider,
  ImageUploadProvider,
  loadImage,
  validateEntityFound,
  validateEntityGoogleDriveFolderId,
  validateEntityNotPublishing,
  validateImageNotAlreadyExists,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImagesService {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly imageLoadNewProvider: ImageLoadNewProvider,
    private readonly imageUploadProvider: ImageUploadProvider,
    private readonly imageUpdateProvider: ImageUpdateProvider,
    private readonly imageRemoveProvider: ImageRemoveProvider
  ) {
    this.logger = new Logger(AdminImagesService.name);
  }

  upload$(
    entityId: string,
    fileName: string,
    isThreeSixty: boolean,
    file: Express.Multer.File
  ): Observable<Image> {
    return this.imageUploadProvider
      .upload$(entityId, fileName, isThreeSixty, file)
      .pipe(concatMap((image) => this.findOne$(image.id, image.entityId)));
  }

  update$(
    id: string,
    entityId: string,
    imageUpdate: ImageUpdateDto
  ): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityNotPublishing),
      concatMap((documentModel) =>
        combineLatest([this.findOne$(id, entityId), of(documentModel)])
      ),
      concatMap(([image, documentModel]) =>
        this.imageUpdateProvider.update$(image, imageUpdate, documentModel)
      ),
      concatMap(() => this.findOne$(id, entityId))
    );
  }

  updateThreeSixtySettings$(
    id: string,
    entityId: string,
    imageDimensionType: ImageDimensionType,
    threeSixtySettings: ThreeSixtySettings
  ): Observable<Image> {
    return this.imageDimensionProvider
      .updateThreeSixtySettings$(
        id,
        entityId,
        imageDimensionType,
        threeSixtySettings,
        this.entityModel
      )
      .pipe(concatMap(() => this.findOne$(id, entityId)));
  }

  select$(id: string, entityId: string): Observable<Image> {
    return of(); // goes from new to selected
  }

  // can update images that are selected or published
  // can remove images that are selected or published

  archive$(id: string, entityId: string): Observable<Image> {
    return of();
    // only published images can be archived
    // can no longer edit and can no longer update it
    // change the media state
    // remove needs to check that not removing a an archived file name
    // also make a copy?
  }

  unarchive$(id: string, entityId: string): Observable<Image> {
    return of();
    // changes the state back to published=
  }

  findAll$(entityId: string, state: MediaState): Observable<Image[]> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        if (state === MediaState.New) {
          const googleDriveFolderId =
            validateEntityGoogleDriveFolderId(documentModel);
          const googleDrive = getGoogleDrive(
            this.configProvider.googleDriveClientEmail,
            this.configProvider.googleDrivePrivateKey
          );
          return this.imageLoadNewProvider
            .findNewImagesFolder$(
              googleDrive,
              documentModel.type,
              googleDriveFolderId,
              documentModel.slug
            )
            .pipe(
              concatMap((newImagesFolder) =>
                this.imageLoadNewProvider.loadNewImages$(
                  googleDrive,
                  documentModel._id,
                  newImagesFolder
                )
              )
            );
        }
        return of(documentModel);
      }),
      concatMap(() => from(this.entityModel.findById(entityId))),
      map(validateEntityFound),
      map((documentModel) =>
        documentModel.images
          .filter((image) => image.state === state)
          .map(loadImage)
      )
    );
  }

  findOne$(id: string, entityId: string): Observable<Image> {
    return this.imageProvider.findOne$(id, entityId);
  }

  stream$(
    id: string,
    imageDimensionType: ImageDimensionType,
    entityId: string
  ): Promise<StreamableFile> {
    return Promise.resolve(
      new StreamableFile(
        fs.createReadStream(join(process.cwd(), 'package.json'))
      )
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => ({
        image: documentModel.images.find((image) => image.id === id),
        documentModel,
      })),
      concatMap(({ image, documentModel }) => {
        if (image && image.state === MediaState.Published) {
          return this.imageRemoveProvider.remove$(image, documentModel._id);
        }
        return of();
      }),
      map(() => undefined)
    );
  }
}
