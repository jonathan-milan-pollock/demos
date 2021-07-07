import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';

import {
  Media,
  MediaState,
  MediaType,
  Video,
  VideoUpdate,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { getEntityTypeAllowsVideoAdd } from '../content/entity-type-allows-video-add.functions';
import { toVideo } from '../content/video.functions';

@Injectable()
export class VideoProvider {
  validateVideoNotFound(
    fileName: string,
    documentModel: DocumentModel
  ): DocumentModel {
    const foundVideo = documentModel.videos.find(
      (video) => video.fileName == fileName
    );
    if (foundVideo)
      throw new ConflictException(
        `Video with file name ${fileName} already exists`,
        HttpStatus.FOUND
      );
    return documentModel;
  }

  validateVideoNotProcessing(video: Video): Video {
    if (video.isProcessing)
      throw new ConflictException(
        'Video cannot be modified as it currently being processed',
        HttpStatus.NOT_ACCEPTABLE
      );
    return video;
  }

  validateCanAddVideoToEntity(documentModel: DocumentModel): DocumentModel {
    if (!getEntityTypeAllowsVideoAdd(documentModel.type)) {
      throw new BadRequestException(
        `Videos cannot be added to entity type ${documentModel.type}`
      );
    }
    return documentModel;
  }

  add$(
    id: string,
    entityId: string,
    fileName: string,
    hlsUrl: string,
    isProcessing: boolean,
    entityModel: Model<DocumentModel>
  ): Observable<Video> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) =>
        from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos,
              {
                id,
                entityId,
                fileName,
                state: MediaState.New,
                order: 0,
                isStared: false,
                title: '',
                description: '',
                keywords: '',
                dateCreated: '',
                datePublished: '',
                coverImageId: '',
                hlsUrl,
                isFlyOver: false,
                isGenerated: false,
                isProcessing,
              },
            ],
          })
        )
      ),
      switchMapTo(this.findOne$(id, entityId, entityModel))
    );
  }

  update$(
    id: string,
    entityId: string,
    videoUpdate: VideoUpdate,
    entityModel: Model<DocumentModel>
  ): Observable<Video> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) => {
        const foundVideo = documentModel.videos.find(
          (video) => video.id === id
        );
        if (!foundVideo) throw new NotFoundException();

        return from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos.filter((video) => video.id !== id),
              {
                id,
                entityId,
                fileName: videoUpdate.fileName ?? '',
                state: videoUpdate.state,
                order: videoUpdate.order,
                isStared: videoUpdate.isStared,
                title: videoUpdate.title ?? '',
                description: videoUpdate.description ?? '',
                keywords: videoUpdate.keywords ?? '',
                dateCreated: foundVideo.dateCreated,
                datePublished: videoUpdate.datePublished ?? '',
                coverImageId: videoUpdate.coverImageId ?? '',
                hlsUrl: videoUpdate.hlsUrl ?? '',
                isFlyOver: videoUpdate.isFlyOver,
                isGenerated: foundVideo.isGenerated,
                isProcessing: foundVideo.isProcessing,
              },
            ],
          })
        );
      }),
      switchMapTo(this.findOne$(id, entityId, entityModel))
    );
  }

  findOne$(
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<Video> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        const foundVideo = documentModel.videos.find((video) => video.id == id);
        if (!foundVideo) throw new NotFoundException('Could not find video');

        return toVideo(foundVideo);
      })
    );
  }

  getMedia(
    id: string,
    fileName: string,
    state: MediaState,
    documentModel: DocumentModel
  ): Media {
    return {
      type: MediaType.Video,
      id,
      fileName,
      state,
      entityType: documentModel.type,
      entityId: documentModel._id,
      entityGroup: documentModel.group,
      entitySlug: documentModel.slug,
    };
  }

  setDateCreated$(
    id: string,
    entityId: string,
    dateCreated: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) => {
        const foundVideo = documentModel.videos.find(
          (video) => video.id === id
        );
        if (!foundVideo) throw new NotFoundException();

        return from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos.filter((video) => video.id !== id),
              { ...foundVideo, dateCreated },
            ],
          })
        );
      }),
      map(validateEntityFound)
    );
  }

  setIsGenerated$(
    id: string,
    entityId: string,
    isGenerated: boolean,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) => {
        const foundVideo = documentModel.videos.find(
          (video) => video.id === id
        );
        if (!foundVideo) throw new NotFoundException();

        return from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos.filter((video) => video.id !== id),
              { ...foundVideo, isGenerated },
            ],
          })
        );
      }),
      map(validateEntityFound)
    );
  }

  setIsProcessing$(
    id: string,
    entityId: string,
    isProcessing: boolean,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) => {
        const foundVideo = documentModel.videos.find(
          (video) => video.id === id
        );
        if (!foundVideo) throw new NotFoundException();

        return from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos.filter((video) => video.id !== id),
              { ...foundVideo, isProcessing },
            ],
          })
        );
      }),
      map(validateEntityFound)
    );
  }

  remove$(
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) =>
        from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos.filter((video) => video.id !== id),
            ],
            videoDimensions: [
              ...documentModel.videoDimensions.filter(
                (videoDimension) => videoDimension.videoId !== id
              ),
            ],
            comments: [
              ...documentModel.comments.filter(
                (comment) => comment.mediaId !== id
              ),
            ],
            emotions: [
              ...documentModel.emotions.filter(
                (emotion) => emotion.mediaId !== id
              ),
            ],
          })
        )
      ),
      map(validateEntityFound)
    );
  }
}
