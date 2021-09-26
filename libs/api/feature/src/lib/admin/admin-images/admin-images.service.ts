import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable, of } from 'rxjs';
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
  loadImage,
  validateCanArchiveImage,
  validateCanSelectImage,
  validateCanUnarchiveImage,
  validateEntityFound,
  validateEntityGoogleDriveFolderId,
  validateEntityNotPublishing,
  validateImageFound,
  validateImageSelectedOrPublic,
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
    private readonly imageUpdateProvider: ImageUpdateProvider,
    private readonly imageRemoveProvider: ImageRemoveProvider
  ) {
    this.logger = new Logger(AdminImagesService.name);
  }

  update$(
    id: string,
    entityId: string,
    imageUpdate: ImageUpdateDto
  ): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityNotPublishing),
      concatMap(() => this.findOne$(id, entityId)),
      map(validateImageSelectedOrPublic),
      concatMap((image) => {
        return this.imageUpdateProvider.update$(image, imageUpdate);
      }),
      concatMap(() => this.findOne$(id, entityId))
    );
  }

  select$(id: string, entityId: string): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityNotPublishing),
      concatMap(() => this.findOne$(id, entityId)),
      map(validateCanSelectImage),
      // concatMap((image) => this.imageUpdateProvider.changeState$(image)),
      concatMap(() => this.findOne$(id, entityId))
    );
  }

  archive$(id: string, entityId: string): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityNotPublishing),
      concatMap(() => this.findOne$(id, entityId)),
      map(validateCanArchiveImage),
      //   concatMap((image) => this.imageUpdateProvider.changeState$(image)),
      concatMap(() => this.findOne$(id, entityId))
    );
  }

  unarchive$(id: string, entityId: string): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityNotPublishing),
      concatMap(() => this.findOne$(id, entityId)),
      map(validateCanUnarchiveImage),
      //  concatMap((image) => this.imageUpdateProvider.changeState$(image)),
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
              concatMap((newImagesFolder) => {
                if (!newImagesFolder) return [];

                return this.imageLoadNewProvider.loadNewImages$(
                  googleDrive,
                  entityId,
                  newImagesFolder
                );
              })
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

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        return of(documentModel.images.find((image) => image.id === id)).pipe(
          map(validateImageFound),
          map(validateImageSelectedOrPublic),
          concatMap((image) =>
            this.imageRemoveProvider
              .removeImage$(image, entityId)
              .pipe(map(() => undefined))
          )
        );
      })
    );
  }
}
