/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs-extra';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

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
  VideoDimension,
  VideoDimensionAddDto,
  VideoDimensionType,
  VideoResolution,
  VideoUpdateDto,
} from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/shared-server/types';
import { DocumentModel } from '../schema/document.schema';
//import {
//  exifVideo$,
//  resizeVideo$,
//  findVideoResolution$,
//} from '@dark-rush-photography/api/util';
import {
  downloadBlobAsBuffer$,
  uploadStreamToBlob$,
  downloadBlobToFile$,
  deleteBlob$,
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithDimension,
} from '@dark-rush-photography/shared-server/util';
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  validateVideoDimensionNotAlreadyExists,
  validateVideoDocumentModelFound,
} from '../content/video-validation.functions';
import { loadVideoDimension } from '../content/video-dimension.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class VideoDimensionProvider {
  private readonly logger: Logger;

  constructor(private readonly configProvider: ConfigProvider) {
    this.logger = new Logger(VideoDimensionProvider.name);
  }

  add$(
    id: string,
    entityId: string,
    videoId: string,
    videoDimensionAdd: VideoDimensionAddDto,
    entityModel: Model<DocumentModel>
  ): Observable<VideoDimension> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) =>
        validateVideoDocumentModelFound(videoId, documentModel)
      ),
      map((documentModel) =>
        validateVideoDimensionNotAlreadyExists(
          videoId,
          videoDimensionAdd,
          documentModel
        )
      ),
      concatMap((documentModel) => {
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            videoDimensions: [
              ...documentModel.videoDimensions,
              {
                id,
                entityId,
                videoId,
                type: videoDimensionAdd.type,
                resolution: videoDimensionAdd.resolution,
              },
            ],
          })
        );
      }),
      concatMapTo(this.findOne$(id, entityId, entityModel))
    );
  }

  updateBlobPathAndExif$(
    videoUpdate: VideoUpdateDto,
    videoMedia: Media,
    videoUpdateMedia: Media,
    videoDimension: VideoDimension
  ): Observable<boolean> {
    return downloadBlobToFile$(
      this.configProvider.getConnectionStringFromMediaState(videoMedia.state),
      getAzureStorageBlobPathWithDimension(videoMedia, videoDimension.type),
      videoMedia.fileName
    ).pipe(
      tap(() =>
        this.logger.debug(
          `Exif video dimension ${videoDimension.type} with update`
        )
      ),
      // concatMap((filePath) =>
      //   exifVideo$(
      //     filePath,
      //     this.configProvider.getVideoArtistExif(new Date().getFullYear()),
      //     {
      //       title: videoUpdate.title,
      //       description: videoUpdate.description,
      //     }
      //  )
      //),
      tap(() =>
        this.logger.debug(
          `Upload video dimension ${videoDimension.type} to new blob path`
        )
      ),
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.getConnectionStringFromMediaState(
            videoUpdateMedia.state
          ),
          fs.createReadStream(filePath),
          getAzureStorageBlobPathWithDimension(
            videoUpdateMedia,
            videoDimension.type
          )
        )
      ),
      tap(() =>
        this.logger.debug(
          `Remove video dimension ${videoDimension.type} at previous blob path`
        )
      ),
      concatMap(() =>
        deleteBlob$(
          this.configProvider.getConnectionStringFromMediaState(
            videoMedia.state
          ),
          getAzureStorageBlobPathWithDimension(videoMedia, videoDimension.type)
        )
      ),
      mapTo(true)
    );
  }

  //resize$(
  //  media: Media,
  //  videoResolution: VideoResolution,
  //  entityModel: Model<DocumentModel>
  //): Observable<VideoDimension> {
  //  const id = uuidv4();
  //  Logger.log(`Resizing video dimension ${videoResolution.type}`);
  //  return downloadBlobToFile$(
  //    this.configProvider.getConnectionStringFromMediaState(media.state),
  //    getAzureStorageBlobPath(media),
  //    media.fileName
  ///  ).pipe(
  //   concatMap((filePath) =>
  //     resizeVideo$(media.fileName, filePath, videoResolution)
  //   ),
  //   concatMap((filePath) =>
  //     combineLatest([
  //       of(filePath),
  //       uploadStreamToBlob$(
  //         this.configProvider.getConnectionStringFromMediaState(media.state),
  //         fs.createReadStream(filePath),
  //         getAzureStorageBlobPathWithDimension(media, videoResolution.type)
  //       ),
  //     ])
  //   ),
  //   tap(() => Logger.log(`Finding video resolution ${videoResolution.type}`)),
  //   concatMap(([filePath]) => findVideoResolution$(filePath)),
  //   tap(() => Logger.log(`Adding video dimension ${videoResolution.type}`)),
  //   concatMap((resolution) =>
  //     this.add$(
  //       id,
  //       media.entityId,
  //       media.id,
  //       {
  //         type: videoResolution.type,
  //         resolution,
  //       },
  //       entityModel
  //     )
  //   ),
  //   tap(() =>
  //     Logger.log(`Resizing video dimension ${videoResolution.type} complete`)
  //   )
  // );
  // }

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

        return loadVideoDimension(foundVideoDimension);
      })
    );
  }

  findDataUri$(
    media: Media,
    videoDimensionType: VideoDimensionType
  ): Observable<string> {
    return downloadBlobAsBuffer$(
      this.configProvider.getConnectionStringFromMediaState(media.state),
      getAzureStorageBlobPathWithDimension(media, videoDimensionType)
    ).pipe(
      map((buffer) => {
        const datauri = require('datauri/parser');
        const parser = new datauri();
        return parser.format('.mp4', buffer).content;
      })
    );
  }
}
