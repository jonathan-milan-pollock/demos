import { HttpService, Inject, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, mapTo, switchMap, switchMapTo } from 'rxjs/operators';

import {
  EntityType,
  ENV,
  ImageDimensionData,
  ImageUpdate,
  MediaType,
  VideoDimensionData,
  VideoUpdate,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  serverlessRemoveMediaProcess$,
  serverlessFindDataUriImage$,
  serverlessFindDataUriVideo$,
  serverlessPostMediaProcess$,
  serverlessUpdateVideoProcess$,
  serverlessUpdateImageProcess$,
  serverlessUploadVideo$,
  serverlessUploadThreeSixtyImage$,
} from '@dark-rush-photography/api/util';
import {
  validateEntityFound,
  validateEntityNotProcessing,
} from '../entities/entity-validation.functions';

@Injectable()
export class ServerlessMediaProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService
  ) {}

  uploadImage$(
    entityId: string,
    image: Express.Multer.File,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityNotProcessing),
      switchMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      map(validateEntityFound),
      switchMap((documentModel) =>
        serverlessUploadThreeSixtyImage$(
          this.env.serverless,
          this.httpService,
          documentModel.type,
          entityId,
          image
        )
      ),
      mapTo(undefined)
    );
  }

  uploadThreeSixtyImage$(
    entityId: string,
    threeSixtyImage: Express.Multer.File,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityNotProcessing),
      switchMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      map(validateEntityFound),
      switchMap((documentModel) =>
        serverlessUploadThreeSixtyImage$(
          this.env.serverless,
          this.httpService,
          documentModel.type,
          entityId,
          threeSixtyImage
        )
      ),
      mapTo(undefined)
    );
  }

  uploadVideo$(
    entityId: string,
    video: Express.Multer.File,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityNotProcessing),
      switchMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      map(validateEntityFound),
      switchMap((documentModel) =>
        serverlessUploadVideo$(
          this.env.serverless,
          this.httpService,
          documentModel.type,
          entityId,
          video
        )
      ),
      mapTo(undefined)
    );
  }

  updateImageProcess$(
    imageId: string,
    entityId: string,
    imageUpdate: ImageUpdate,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityNotProcessing),
      switchMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      map(validateEntityFound),
      switchMap((documentModel) =>
        serverlessUpdateImageProcess$(
          this.env.serverless,
          this.httpService,
          imageId,
          documentModel.type,
          entityId,
          imageUpdate
        )
      ),
      mapTo(undefined)
    );
  }

  updateVideoProcess$(
    videoId: string,
    entityId: string,
    videoUpdate: VideoUpdate,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityNotProcessing),
      switchMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      map(validateEntityFound),
      switchMap((documentModel) =>
        serverlessUpdateVideoProcess$(
          this.env.serverless,
          this.httpService,
          videoId,
          documentModel.type,
          entityId,
          videoUpdate
        )
      ),
      mapTo(undefined)
    );
  }

  postProcess$(
    mediaType: MediaType,
    mediaId: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      switchMapTo(from(entityModel.findById(entityId))),
      map(validateEntityFound),
      map(validateEntityNotProcessing),
      switchMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      map(validateEntityFound),
      switchMap((documentModel) =>
        serverlessPostMediaProcess$(
          this.env.serverless,
          this.httpService,
          mediaType,
          mediaId,
          documentModel.type,
          entityId
        )
      ),
      mapTo(undefined)
    );
  }

  removeProcess$(
    mediaType: MediaType,
    mediaId: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityNotProcessing),
      switchMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      map(validateEntityFound),
      switchMap((documentModel) =>
        serverlessRemoveMediaProcess$(
          this.env.serverless,
          this.httpService,
          mediaType,
          mediaId,
          documentModel.type,
          entityId
        )
      ),
      mapTo(undefined)
    );
  }

  findDataUriImage$(
    imageDimensionId: string,
    imageId: string,
    entityType: EntityType,
    entityId: string
  ): Observable<ImageDimensionData> {
    return serverlessFindDataUriImage$(
      this.env.serverless,
      this.httpService,
      imageDimensionId,
      imageId,
      entityType,
      entityId
    );
  }

  findDataUriVideo$(
    videoDimensionId: string,
    videoId: string,
    entityType: EntityType,
    entityId: string
  ): Observable<VideoDimensionData> {
    return serverlessFindDataUriVideo$(
      this.env.serverless,
      this.httpService,
      videoDimensionId,
      videoId,
      entityType,
      entityId
    );
  }
}
