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
  ImageUpdateDto,
  MediaState,
  ThreeSixtySettings,
} from '@dark-rush-photography/shared/types';
import { getGoogleDrive } from '@dark-rush-photography/api/util';
import {
  ConfigProvider,
  Document,
  DocumentModel,
  EntityLoadProvider,
  EntityProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUpdateProvider,
  ImageUploadProvider,
  loadImage,
  validateEntityFound,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImagesService {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly entityLoadProvider: EntityLoadProvider,
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
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
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        this.imageProvider.validateImageNotAlreadyExists(
          fileName,
          documentModel
        );
        return documentModel;
      }),
      concatMap((documentModel) =>
        combineLatest([
          of(documentModel),
          this.imageProvider.add$(id, entityId, fileName, 0, isThreeSixty),
        ])
      ),
      concatMap(([documentModel, image]) =>
        this.imageUploadProvider.upload$(
          image.state,
          image.blobPathId,
          image.fileName,
          file
        )
      ),
      // concatMap((media) =>
      //   this.imageUploadProvider.process$(media, isThreeSixty, this.entityModel)
      // ),
      tap(() => this.logger.debug('Upload complete')),
      concatMap(() => this.findOne$(id, entityId))
    );
  }

  update$(
    id: string,
    entityId: string,
    imageUpdate: ImageUpdateDto
  ): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        combineLatest([this.findOne$(id, entityId), of(documentModel)])
      ),
      concatMap(([image, documentModel]) =>
        this.imageUpdateProvider.update$(
          image,
          imageUpdate,
          documentModel,
          this.entityModel
        )
      ),
      tap(() => this.logger.debug('Update complete')),
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
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );
    return this.entityProvider.findOne$(entityId, this.entityModel).pipe(
      concatMap((documentModel) =>
        this.entityLoadProvider.loadNewImages$(
          googleDrive,
          documentModel.type,
          entityId
        )
      ),
      concatMap(() => this.entityProvider.findOne$(entityId, this.entityModel)),
      map((documentModel) =>
        documentModel.images
          .filter((image) => image.state === MediaState.New)
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
          return this.imageRemoveProvider.remove$(image, documentModel);
        }
        return of();
      }),
      tap(() => this.logger.debug('Remove complete')),
      map(() => undefined)
    );
  }
}
