import { HttpService, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, switchMapTo, tap } from 'rxjs/operators';

import { Entity, ENV, Video } from '@dark-rush-photography/shared-types';
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

  add$(entityId: string, videoAdd: VideoAddDto): Observable<Video> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        const foundVideo = this.videoProvider.findVideoBySlug(
          videoAdd.fileName,
          documentModel.videos
        );
        if (foundVideo) return of(documentModel);

        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.videoProvider.addVideo(
              id,
              entityId,
              videoAdd,
              documentModel.videos
            )
          )
        );
      }),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  update$(
    id: string,
    entityId: string,
    videoUpdate: VideoUpdateDto
  ): Observable<Video> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        const foundVideo = this.videoProvider.validateUpdateVideo(
          id,
          videoUpdate.postState,
          documentModel.videos
        );

        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.videoProvider.updateVideo(
              id,
              foundVideo,
              videoUpdate,
              documentModel.videos
            )
          )
        );
      }),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  findOne$(id: string, entityId: string): Observable<Video> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      map((documentModel) =>
        this.videoProvider.validateFindVideo(id, documentModel.videos)
      ),
      map((video) => this.videoProvider.toVideo(video))
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
          documentModel as Entity,
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
