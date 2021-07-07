import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, switchMapTo } from 'rxjs/operators';

import {
  ENV,
  Image,
  ImageUpdate,
  ThreeSixtyImageSettings,
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
} from '@dark-rush-photography/api/data';
import { Env } from '@dark-rush-photography/api/types';

@Injectable()
export class AdminImagesService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly imageUploadProvider: ImageUploadProvider,
    private readonly imageUpdateProvider: ImageUpdateProvider,
    private readonly imageRemoveProvider: ImageRemoveProvider
  ) {}

  upload$(
    entityId: string,
    fileName: string,
    isThreeSixtyImage: boolean,
    file: Express.Multer.File
  ): Observable<Image> {
    const isProcessing = true;
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateProcessingEntity),
      map((documentModel) =>
        this.imageProvider.validateImageNotFound(fileName, documentModel)
      ),
      map(this.imageProvider.validateCanAddImageToEntity),
      switchMap((documentModel) =>
        combineLatest([
          of(documentModel),
          from(
            this.imageProvider.add$(
              id,
              entityId,
              fileName,
              isProcessing,
              this.entityModel
            )
          ),
        ])
      ),
      map(([documentModel, image]) => {
        return this.imageProvider.getMedia(
          image.id,
          image.fileName,
          image.state,
          documentModel
        );
      }),
      switchMap((media) =>
        from(
          this.imageUploadProvider.upload$(
            media,
            isThreeSixtyImage,
            file,
            this.entityModel
          )
        )
      ),
      switchMapTo(from(this.findOne$(id, entityId)))
    );
  }

  uploadLightroomImage$(
    lightroomPath: string,
    file: Express.Multer.File
  ): Observable<Image> {
    const lightroomMedia = this.imageProvider.getLightroomMedia(lightroomPath);
    return this.entityProvider
      .findOrCreate$(
        lightroomMedia.entityType,
        lightroomMedia.entityGroup,
        lightroomMedia.entitySlug,
        this.entityModel
      )
      .pipe(
        switchMap((documentModel) =>
          this.upload$(documentModel._id, lightroomMedia.fileName, false, file)
        )
      );
  }

  update$(
    id: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateProcessingEntity),
      switchMap((documentModel) =>
        combineLatest([of(documentModel), from(this.findOne$(id, entityId))])
      ),
      map(([documentModel, image]) => ({
        image: this.imageProvider.validateImageNotProcessing(image),
        documentModel,
      })),
      switchMap(({ image, documentModel }) =>
        from(
          this.imageUpdateProvider.update$(
            image,
            imageUpdate,
            documentModel,
            this.entityModel
          )
        )
      ),
      switchMapTo(from(this.findOne$(id, entityId)))
    );
  }

  updateThreeSixtyImageSettings$(
    id: string,
    entityId: string,
    threeSixtyImageSettings: ThreeSixtyImageSettings
  ): Observable<void> {
    return this.imageDimensionProvider
      .updateThreeSixtyImageSettings$(
        id,
        entityId,
        threeSixtyImageSettings,
        this.entityModel
      )
      .pipe(mapTo(undefined));
  }

  setIsProcessing$(
    id: string,
    entityId: string,
    isProcessing: boolean
  ): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      switchMap((documentModel) =>
        combineLatest([of(documentModel), from(this.findOne$(id, entityId))])
      ),
      switchMapTo(
        from(
          this.imageUpdateProvider.setIsProcessing$(
            id,
            entityId,
            isProcessing,
            this.entityModel
          )
        )
      ),
      switchMapTo(from(this.findOne$(id, entityId)))
    );
  }

  findOne$(id: string, entityId: string): Observable<Image> {
    return this.imageProvider.findOne$(id, entityId, this.entityModel);
  }

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateProcessingEntity),
      map((documentModel) => ({
        image: documentModel.images.find((image) => image.id == id),
        documentModel,
      })),
      switchMap(({ image, documentModel }) => {
        if (image && this.imageProvider.validateImageNotProcessing(image)) {
          return from(
            this.imageRemoveProvider.remove$(
              image,
              documentModel,
              this.entityModel
            )
          );
        }
        return of(image);
      }),
      mapTo(undefined)
    );
  }
}
