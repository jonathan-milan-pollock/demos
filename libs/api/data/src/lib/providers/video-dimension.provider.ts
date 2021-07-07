/* eslint-disable @typescript-eslint/no-var-requires */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';

import {
  ENV,
  Media,
  VideoDimension,
  VideoDimensionAdd,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  toVideoDimension,
  validateAddVideoDimension,
} from '../content/video-dimension.functions';
import { AzureStorageProvider } from './azure-storage.provider';
import { ServerlessVideoProvider } from './serverless-video.provider';

@Injectable()
export class VideoDimensionProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider,
    private readonly serverlessVideoProvider: ServerlessVideoProvider
  ) {}

  add$(
    entityId: string,
    videoId: string,
    videoDimensionAdd: VideoDimensionAdd,
    entityModel: Model<DocumentModel>
  ): Observable<VideoDimension> {
    const id = uuidv4();
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) => {
        const validatedDocumentModel = validateAddVideoDimension(
          videoId,
          videoDimensionAdd,
          documentModel
        );
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            videoDimensions: [
              ...validatedDocumentModel.videoDimensions,
              { ...videoDimensionAdd, id, entityId, videoId },
            ],
          })
        );
      }),
      switchMapTo(this.findOne$(id, entityId, entityModel))
    );
  }

  resizeVideo$(
    media: Media,
    entityModel: Model<DocumentModel>
  ): Observable<Media> {
    return this.serverlessVideoProvider
      .serverlessResizeVideo$({
        video: media,
        videoDimensionType: VideoDimensionType.YouTube,
      })
      .pipe
      // TODO: Update the video dimension pixels
      ();
  }

  findOne$(
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<VideoDimension> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        const foundVideoDimension = documentModel.videoDimensions.find(
          (videoDimension) => videoDimension.id == id
        );
        if (!foundVideoDimension)
          throw new NotFoundException('Could not find video dimension');

        return toVideoDimension(foundVideoDimension);
      })
    );
  }

  findDataUri = (
    media: Media,
    videoDimensionType: VideoDimensionType
  ): Observable<string> => {
    return this.azureStorageProvider
      .downloadBlobAsBuffer$(
        this.env.azureStorageConnectionString,
        this.azureStorageProvider.getAzureStorageType(media.state),
        this.azureStorageProvider.getBlobPathWithDimension(
          media,
          videoDimensionType
        )
      )
      .pipe(
        map((buffer) => {
          const datauri = require('datauri/parser');
          const parser = new datauri();
          return parser.format('.mp4', buffer).content;
        })
      );
  };
}
