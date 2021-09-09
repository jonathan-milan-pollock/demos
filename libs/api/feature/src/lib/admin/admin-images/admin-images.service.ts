import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { combineLatest, concatMap, from, map, Observable, of, tap } from 'rxjs';

import {
  Image,
  ImageDimensionType,
  ImageUpdateDto,
  MediaState,
  MediaType,
  ThreeSixtySettings,
} from '@dark-rush-photography/shared/types';
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
  validateProcessingEntity,
} from '@dark-rush-photography/api/data';
import { getGoogleDrive } from '@dark-rush-photography/api/util';

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
      map(validateProcessingEntity),
      map((documentModel) =>
        this.imageProvider.validateImageNotAlreadyExists(
          fileName,
          documentModel
        )
      ),
      concatMap((documentModel) =>
        combineLatest([
          this.imageProvider.add$(
            id,
            entityId,
            fileName,
            0,
            isThreeSixty,
            true
          ),
          of(documentModel),
        ])
      ),
      map(([image, documentModel]) =>
        this.imageProvider.loadMedia(
          MediaType.Image,
          image.id,
          fileName,
          image.state,
          documentModel
        )
      ),
      concatMap((media) =>
        this.imageUploadProvider.upload$(media, file).pipe(map(() => media))
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
      map(validateProcessingEntity),
      concatMap((documentModel) =>
        combineLatest([this.findOne$(id, entityId), of(documentModel)])
      ),
      map(([image, documentModel]) => ({
        image: this.imageProvider.validateImageNotProcessing(image),
        documentModel,
      })),
      concatMap(({ image, documentModel }) =>
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

  setIsProcessing$(
    id: string,
    entityId: string,
    isProcessing: boolean
  ): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap(() => this.findOne$(id, entityId)),
      concatMap(() =>
        this.imageProvider.setIsProcessing$(
          id,
          entityId,
          isProcessing,
          this.entityModel
        )
      ),
      map(() => undefined)
    );
  }

  loadNewImages$(entityId: string): Observable<Image[]> {
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
          .filter((image) => image.state == MediaState.New)
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
      map(validateProcessingEntity),
      map((documentModel) => ({
        image: documentModel.images.find((image) => image.id == id),
        documentModel,
      })),
      concatMap(({ image, documentModel }) => {
        if (image && this.imageProvider.validateImageNotProcessing(image)) {
          return this.imageRemoveProvider.remove$(
            image,
            documentModel,
            this.entityModel
          );
        }
        return of();
      }),
      tap(() => this.logger.debug('Remove complete')),
      map(() => undefined)
    );
  }
}
