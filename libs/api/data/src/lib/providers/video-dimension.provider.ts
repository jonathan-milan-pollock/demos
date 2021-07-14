/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { concatMap, concatMapTo, map } from 'rxjs/operators';

import {
  Media,
  VideoDimension,
  VideoDimensionAdd,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  downloadBlobAsBuffer$,
  getAzureStorageTypeFromMediaState,
  getBlobPathWithDimension,
} from '@dark-rush-photography/shared-server/util';
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  toVideoDimension,
  validateAddVideoDimension,
} from '../content/video-dimension.functions';

@Injectable()
export class VideoDimensionProvider {
  constructor(private readonly configService: ConfigService<Env>) {}

  add$(
    entityId: string,
    videoId: string,
    videoDimensionAdd: VideoDimensionAdd,
    entityModel: Model<DocumentModel>
  ): Observable<VideoDimension> {
    const id = uuidv4();
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
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
      concatMapTo(this.findOne$(id, entityId, entityModel))
    );
  }

  resizeVideo$(
    media: Media,
    entityModel: Model<DocumentModel>
  ): Observable<Media> {
    return of();
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
    return downloadBlobAsBuffer$(
      this.configService.get<Env>('privateBlobConnectionString', {
        infer: true,
      }),
      getAzureStorageTypeFromMediaState(media.state),
      getBlobPathWithDimension(media, videoDimensionType)
    ).pipe(
      map((buffer) => {
        const datauri = require('datauri/parser');
        const parser = new datauri();
        return parser.format('.mp4', buffer).content;
      })
    );
  };
}
