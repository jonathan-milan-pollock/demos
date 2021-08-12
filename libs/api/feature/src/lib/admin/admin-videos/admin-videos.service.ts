import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

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
  MediaType,
  Video,
  VideoAddDto,
  VideoDimensionType,
  VideoUpdateDto,
} from '@dark-rush-photography/shared/types';
import {
  Document,
  DocumentModel,
  EntityProvider,
  VideoDimensionProvider,
  VideoProvider,
  VideoRemoveProvider,
  VideoUpdateProvider,
  VideoUploadProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminVideosService {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly videoProvider: VideoProvider,
    private readonly videoDimensionProvider: VideoDimensionProvider,
    private readonly videoUploadProvider: VideoUploadProvider,
    private readonly videoUpdateProvider: VideoUpdateProvider,
    private readonly videoRemoveProvider: VideoRemoveProvider
  ) {
    this.logger = new Logger(AdminVideosService.name);
  }

  upload$(
    entityId: string,
    fileName: string,
    isThreeSixty: boolean,
    file: Express.Multer.File
  ): Observable<Video> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateProcessingEntity),
      map((documentModel) =>
        this.videoProvider.validateVideoNotAlreadyExists(
          fileName,
          documentModel
        )
      ),
      map(this.videoProvider.validateCanAddVideoToEntity),
      concatMap((documentModel) =>
        combineLatest([
          this.videoProvider.addUpload$(
            id,
            entityId,
            fileName,
            isThreeSixty,
            true,
            this.entityModel
          ),
          of(documentModel),
        ])
      ),
      map(([video, documentModel]) => {
        return this.videoProvider.loadMedia(
          MediaType.Video,
          video.id,
          fileName,
          video.state,
          documentModel
        );
      }),
      concatMap((media) =>
        this.videoUploadProvider.upload$(
          media,
          isThreeSixty,
          file,
          this.entityModel
        )
      ),
      tap(() => this.logger.debug('Upload complete')),
      concatMapTo(this.findOne$(id, entityId))
    );
  }

  add$(entityId: string, videoAdd: VideoAddDto): Observable<Video> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.videoProvider.validateCanAddVideoToEntity),
      concatMapTo(
        this.videoProvider.add$(id, entityId, videoAdd, false, this.entityModel)
      )
    );
  }

  update$(
    id: string,
    entityId: string,
    videoUpdate: VideoUpdateDto
  ): Observable<Video> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateProcessingEntity),
      concatMap((documentModel) =>
        combineLatest([this.findOne$(id, entityId), of(documentModel)])
      ),
      map(([video, documentModel]) => ({
        video: this.videoProvider.validateVideoNotProcessing(video),
        documentModel,
      })),
      concatMap(({ video, documentModel }) =>
        this.videoUpdateProvider.update$(
          video,
          videoUpdate,
          documentModel,
          this.entityModel
        )
      ),
      tap(() => this.logger.debug('Update complete')),
      concatMapTo(this.findOne$(id, entityId))
    );
  }

  setIsProcessing$(
    id: string,
    entityId: string,
    isProcessing: boolean
  ): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      concatMapTo(this.findOne$(id, entityId)),
      concatMapTo(
        this.videoProvider.setIsProcessing$(
          id,
          entityId,
          isProcessing,
          this.entityModel
        )
      ),
      mapTo(undefined)
    );
  }

  findOne$(id: string, entityId: string): Observable<Video> {
    return this.videoProvider.findOne$(id, entityId, this.entityModel);
  }

  findDataUri$(
    id: string,
    entityId: string,
    videoDimensionType: VideoDimensionType
  ): Observable<string> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.entityProvider.validateEntityFound),
      concatMap((documentModel) =>
        combineLatest([this.findOne$(id, entityId), of(documentModel)])
      ),
      map(([video, documentModel]) => ({
        video: this.videoProvider.validateVideoDataUriExists(video),
        documentModel,
      })),
      map(({ video, documentModel }) => {
        return this.videoProvider.loadMedia(
          MediaType.Video,
          video.id,
          video.fileName,
          video.state,
          documentModel
        );
      }),
      concatMap((media) =>
        this.videoDimensionProvider.findDataUri$(media, videoDimensionType)
      )
    );
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
          return this.videoRemoveProvider.remove$(
            video,
            documentModel,
            this.entityModel
          );
        }
        return of();
      }),
      tap(() => this.logger.debug('Remove complete')),
      mapTo(undefined)
    );
  }
}
