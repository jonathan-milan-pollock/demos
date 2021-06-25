import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { HttpService, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, switchMapTo, tap } from 'rxjs/operators';

import { ENV, Video } from '@dark-rush-photography/shared-types';
import {
  Env,
  VideoAddDto,
  VideoUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  DocumentModelProvider,
  ServerlessProvider,
  VideoProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminVideosService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly videoProvider: VideoProvider,
    private readonly documentModelProvider: DocumentModelProvider,
    private readonly serverlessProvider: ServerlessProvider
  ) {}

  add$(entityId: string, video: VideoAddDto): Observable<Video> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.videoProvider.addVideo(
              id,
              entityId,
              video,
              documentModel.videos
            )
          )
        );
      }),
      map(this.documentModelProvider.validateAdd),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  update$(
    id: string,
    entityId: string,
    video: VideoUpdateDto
  ): Observable<Video> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      tap((documentModel) =>
        this.videoProvider.validateUpdateVideo(id, video, documentModel.videos)
      ),
      switchMap((documentModel) =>
        from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.videoProvider.updateVideo(
              id,
              entityId,
              video,
              documentModel.videos
            )
          )
        )
      ),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  findOne$(id: string, entityId: string): Observable<Video> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      map((documentModel) =>
        this.videoProvider.validateAddVideo(id, documentModel.videos)
      )
    );
  }

  upload$(entityId: string, file: Express.Multer.File): Observable<Video> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) =>
        this.serverlessProvider.upload$(
          this.env.serverless,
          this.httpService,
          'upload-video',
          entityId,
          documentModel.type,
          file
        )
      ),
      map((response) => response as Video)
    );
  }

  post$(id: string, entityId: string): Observable<Video> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      tap((documentModel) => {
        this.videoProvider.validateFindVideo(id, documentModel.videos);
      }),
      switchMap((documentModel) =>
        this.serverlessProvider.post$(
          this.env.serverless,
          this.httpService,
          'post-video',
          id,
          documentModel.type
        )
      ),
      map((response) => response as Video)
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.videoProvider.removeVideo(
              id,
              documentModel.videos,
              documentModel.videoDimensions
            )
          )
        );
      }),
      map(this.documentModelProvider.validateRemove)
    );
  }
}
