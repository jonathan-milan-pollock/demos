import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Video } from '@dark-rush-photography/shared/types';
import {
  deleteBlob$,
  getAzureStorageBlobPath,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class VideoRemoveProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  remove$(
    video: Video,
    documentModel: DocumentModel
  ): Observable<DocumentModel> {
    const videoId = video.id;
    const entityId = documentModel._id;
    return this.removeVideoBlobs$(video.blobPathId, video.fileName).pipe(
      concatMap(() =>
        from(this.entityModel.findById(entityId)).pipe(
          map(validateEntityFound),
          concatMap((documentModel) => {
            return from(
              this.entityModel.findByIdAndUpdate(entityId, {
                videos: [
                  ...documentModel.videos.filter(
                    (video) => video.id !== videoId
                  ),
                ],
              })
            );
          }),
          map(validateEntityFound)
        )
      )
    );
  }

  removeVideoBlobs$(blobPathId: string, fileName: string): Observable<boolean> {
    return deleteBlob$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      getAzureStorageBlobPath(blobPathId, fileName)
    );
  }
}
