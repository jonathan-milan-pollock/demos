import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map, switchMapTo } from 'rxjs/operators';

import {
  ContentType,
  MediaState,
  MediaType,
  Video,
  VideoAdd,
  VideoUpdate,
} from '@dark-rush-photography/shared/types';
import {
  ContentProvider,
  Document,
  DocumentModel,
  ServerlessMediaProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminVideosService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentProvider: ContentProvider,
    private readonly serverlessMediaProvider: ServerlessMediaProvider
  ) {}

  add$(entityId: string, videoAdd: VideoAdd): Observable<Video> {
    const id = uuidv4();
    return this.contentProvider
      .add$(
        ContentType.Video,
        entityId,
        this.entityModel,
        (documentModel) =>
          !!documentModel.videos.find(
            (video) => video.fileName == videoAdd.fileName
          ),
        (documentModel) => ({
          videos: [
            ...documentModel.videos,
            {
              ...videoAdd,
              id,
              entityId,
              state: MediaState.New,
              order: 0,
              isStared: false,
              isFlyOver: false,
              isGenerated: false,
            },
          ],
        })
      )
      .pipe(switchMapTo(this.findOne$(id, entityId)));
  }

  uploadVideo$(entityId: string, video: Express.Multer.File): Observable<void> {
    return this.serverlessMediaProvider.uploadVideo$(
      entityId,
      video,
      this.entityModel
    );
  }

  updateProcess$(
    id: string,
    entityId: string,
    videoUpdate: VideoUpdate
  ): Observable<void> {
    return this.serverlessMediaProvider.updateVideoProcess$(
      id,
      entityId,
      videoUpdate,
      this.entityModel
    );
  }

  update$(
    id: string,
    entityId: string,
    videoUpdate: VideoUpdate
  ): Observable<Video> {
    return this.contentProvider
      .update$(
        ContentType.Video,
        id,
        entityId,
        this.entityModel,
        (documentModel) => {
          const foundVideo = documentModel.videos.find(
            (video) => video.id == id
          );
          return {
            videos: [
              ...documentModel.videos.filter((video) => video.id !== id),
              { ...foundVideo, ...videoUpdate },
            ],
          } as Partial<DocumentModel>;
        }
      )
      .pipe(switchMapTo(this.findOne$(id, entityId)));
  }

  postProcess$(id: string, entityId: string): Observable<void> {
    return this.serverlessMediaProvider.postProcess$(
      MediaType.Video,
      id,
      entityId,
      this.entityModel
    );
  }

  findOne$(id: string, entityId: string): Observable<Video> {
    return this.contentProvider
      .findOne$(ContentType.Video, id, entityId, this.entityModel)
      .pipe(
        map((documentModel) =>
          this.contentProvider.toVideo(
            documentModel.videos.find((video) => video.id == id)
          )
        )
      );
  }

  removeProcess$(id: string, entityId: string): Observable<void> {
    return this.serverlessMediaProvider.removeProcess$(
      MediaType.Video,
      id,
      entityId,
      this.entityModel
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return this.contentProvider.remove$(
      ContentType.Video,
      id,
      entityId,
      this.entityModel,
      (documentModel) => {
        return {
          videos: [...documentModel.videos.filter((video) => video.id !== id)],
        } as Partial<DocumentModel>;
      }
    );
  }
}
