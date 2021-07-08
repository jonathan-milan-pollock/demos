import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { combineLatest, from, Observable, of } from 'rxjs';
import { concatMap, concatMapTo, map, mapTo } from 'rxjs/operators';

import {
  HlsVideoAdd,
  Video,
  VideoUpdate,
} from '@dark-rush-photography/shared/types';
import {
  Document,
  DocumentModel,
  EntityProvider,
  VideoProvider,
  VideoRemoveProvider,
  VideoUpdateProvider,
  VideoUploadProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminVideosService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly videoProvider: VideoProvider,
    private readonly videoUploadProvider: VideoUploadProvider,
    private readonly videoUpdateProvider: VideoUpdateProvider,
    private readonly videoRemoveProvider: VideoRemoveProvider
  ) {}

  addHlsVideo$(entityId: string, hlsVideoAdd: HlsVideoAdd): Observable<Video> {
    const fileName = '';
    const isProcessing = false;
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.videoProvider.validateCanAddVideoToEntity),
      concatMapTo(
        this.videoProvider.add$(
          id,
          entityId,
          fileName,
          hlsVideoAdd.hlsUrl,
          isProcessing,
          this.entityModel
        )
      )
    );
  }

  upload$(
    entityId: string,
    fileName: string,
    file: Express.Multer.File
  ): Observable<Video> {
    const hlsUrl = '';
    const isProcessing = true;
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateProcessingEntity),
      map((documentModel) =>
        this.videoProvider.validateVideoNotFound(fileName, documentModel)
      ),
      map(this.videoProvider.validateCanAddVideoToEntity),
      concatMap((documentModel) =>
        combineLatest([
          of(documentModel),
          from(
            this.videoProvider.add$(
              id,
              entityId,
              fileName,
              hlsUrl,
              isProcessing,
              this.entityModel
            )
          ),
        ])
      ),
      map(([documentModel, image]) => {
        return this.videoProvider.getMedia(
          image.id,
          image.fileName,
          image.state,
          documentModel
        );
      }),
      concatMap((media) =>
        from(this.videoUploadProvider.upload$(media, file, this.entityModel))
      ),
      concatMapTo(from(this.findOne$(id, entityId)))
    );
  }

  update$(
    id: string,
    entityId: string,
    videoUpdate: VideoUpdate
  ): Observable<Video> {
    return this.videoProvider.update$(
      id,
      entityId,
      videoUpdate,
      this.entityModel
    );
  }

  findOne$(id: string, entityId: string): Observable<Video> {
    return this.videoProvider.findOne$(id, entityId, this.entityModel);
  }

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateProcessingEntity),
      map((documentModel) => ({
        video: documentModel.videos.find((video) => video.id == id),
        documentModel,
      })),
      concatMap(({ video, documentModel }) => {
        if (video && this.videoProvider.validateVideoNotProcessing(video)) {
          return from(
            this.videoRemoveProvider.remove$(
              video,
              documentModel,
              this.entityModel
            )
          );
        }
        return of(video);
      }),
      mapTo(undefined)
    );
  }
}
