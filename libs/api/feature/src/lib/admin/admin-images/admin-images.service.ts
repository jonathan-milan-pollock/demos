import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

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
  EntityType,
  Image,
  ImageDimensionType,
  ImageUpdateDto,
  MediaType,
  ThreeSixtySettings,
} from '@dark-rush-photography/shared/types';
import {
  Document,
  DocumentModel,
  EntityProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUpdateProvider,
  ImageUploadProvider,
  MediaProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImagesService {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly mediaProvider: MediaProvider,
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
    order: number,
    isThreeSixty: boolean,
    file: Express.Multer.File
  ): Observable<Image> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateProcessingEntity),
      map((documentModel) =>
        this.imageProvider.validateImageNotAlreadyExists(
          fileName,
          documentModel
        )
      ),
      concatMap((documentModel) =>
        combineLatest([
          this.imageProvider.addUpload$(
            id,
            entityId,
            fileName,
            order,
            isThreeSixty,
            true,
            this.entityModel
          ),
          of(documentModel),
        ])
      ),
      map(([image, documentModel]) =>
        this.mediaProvider.loadMedia(
          MediaType.Image,
          image.id,
          fileName,
          image.state,
          documentModel
        )
      ),
      concatMap((media) =>
        this.imageUploadProvider.upload$(
          media,
          isThreeSixty,
          file,
          this.entityModel
        )
      ),
      tap(() => this.logger.debug('Upload complete')),
      concatMapTo(this.findOne$(id, entityId))
    );
  }

  uploadLightroom$(
    lightroomPath: string,
    file: Express.Multer.File
  ): Observable<Image> {
    const lightroomMedia = this.imageProvider.getLightroomMedia(lightroomPath);
    return from(
      from(
        this.entityModel.findOne({
          type: lightroomMedia.entityType,
          group: lightroomMedia.entityGroup,
          slug: lightroomMedia.entitySlug,
        })
      )
    ).pipe(
      concatMap((documentModel) =>
        documentModel
          ? of(documentModel)
          : from(
              new this.entityModel({
                type: lightroomMedia.entityType,
                group: lightroomMedia.entityGroup,
                slug: lightroomMedia.entitySlug,
                isPublic: [
                  EntityType.About,
                  EntityType.BestOfChildren,
                  EntityType.BestOfEvents,
                  EntityType.BestOfLandscapes,
                  EntityType.BestOfNature,
                  EntityType.BestOfRealEstate,
                  EntityType.Favorites,
                  EntityType.ReviewMedia,
                ].includes(lightroomMedia.entityType),
              }).save()
            )
      ),
      map(this.entityProvider.validateEntityFound),
      concatMap((documentModel) =>
        this.upload$(
          documentModel._id,
          lightroomMedia.fileName,
          +lightroomMedia.fileName.replace(
            path.extname(lightroomMedia.fileName),
            ''
          ),
          false,
          file
        )
      )
    );
  }

  update$(
    id: string,
    entityId: string,
    imageUpdate: ImageUpdateDto
  ): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateProcessingEntity),
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
      concatMapTo(this.findOne$(id, entityId))
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
      .pipe(concatMapTo(this.findOne$(id, entityId)));
  }

  setIsProcessing$(
    id: string,
    entityId: string,
    isProcessing: boolean
  ): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      concatMapTo(this.findOne$(id, entityId)),
      concatMapTo(
        this.imageProvider.setIsProcessing$(
          id,
          entityId,
          isProcessing,
          this.entityModel
        )
      ),
      mapTo(undefined)
    );
  }

  findOne$(id: string, entityId: string): Observable<Image> {
    return this.imageProvider.findOne$(id, entityId, this.entityModel);
  }

  findDataUri$(
    id: string,
    entityId: string,
    imageDimensionType: ImageDimensionType
  ): Observable<string> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      concatMap((documentModel) =>
        combineLatest([this.findOne$(id, entityId), of(documentModel)])
      ),
      map(([image, documentModel]) =>
        this.mediaProvider.loadMedia(
          MediaType.Image,
          image.id,
          image.fileName,
          image.state,
          documentModel
        )
      ),
      concatMap((media) =>
        this.imageDimensionProvider.findDataUri$(media, imageDimensionType)
      )
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateProcessingEntity),
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
      mapTo(undefined)
    );
  }
}
