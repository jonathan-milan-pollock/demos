import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { concatMap, concatMapTo, from, map, Observable } from 'rxjs';

import {
  MediaState,
  MediaType,
  Video,
  VideoAddDto,
  VideoDto,
  VideoUpdateDto,
} from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { loadMedia } from '../content/media.functions';
import {
  validateEntityFound,
  validateEntityIsPublic,
} from '../entities/entity-validation.functions';
import {
  validateCanAddVideoToEntity,
  validateVideoDataUriExists,
  validateVideoFound,
  validateVideoNotAlreadyExists,
  validateVideoNotProcessing,
  validateVideoPublic,
} from '../content/video-validation.functions';
import { loadPublicVideo, loadVideo } from '../content/video.functions';
import { loadPublicContent } from '../content/public-content.functions';

@Injectable()
export class VideoProvider {
  validateVideoNotAlreadyExists(
    fileName: string,
    documentModel: DocumentModel
  ): DocumentModel {
    return validateVideoNotAlreadyExists(fileName, documentModel);
  }

  validateVideoNotProcessing(video: Video): Video {
    return validateVideoNotProcessing(video);
  }

  validateCanAddVideoToEntity(documentModel: DocumentModel): DocumentModel {
    return validateCanAddVideoToEntity(documentModel);
  }

  validateVideoDataUriExists(video: Video): Video {
    return validateVideoDataUriExists(video);
  }

  loadMedia(
    type: MediaType,
    id: string,
    fileName: string,
    state: MediaState,
    documentModel: DocumentModel
  ): Media {
    return loadMedia(type, id, fileName, state, documentModel);
  }

  addUpload$(
    id: string,
    entityId: string,
    fileName: string,
    isThreeSixty: boolean,
    isProcessing: boolean,
    entityModel: Model<DocumentModel>
  ): Observable<Video> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
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
                isStarred: false,
                isThreeSixty,
                isFlyOver: false,
                isUploaded: true,
                isGenerated: false,
                isProcessing,
              },
            ],
          })
        )
      ),
      concatMapTo(this.findOne$(id, entityId, entityModel))
    );
  }

  add$(
    id: string,
    entityId: string,
    videoAdd: VideoAddDto,
    isProcessing: boolean,
    entityModel: Model<DocumentModel>
  ): Observable<Video> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos,
              {
                id,
                entityId,
                fileName: videoAdd.fileName,
                state: MediaState.New,
                order: videoAdd.order,
                isStarred: videoAdd.isStarred,
                title: videoAdd.title,
                description: videoAdd.description,
                keywords: videoAdd.keywords,
                dateCreated: videoAdd.dateCreated,
                datePublished: videoAdd.datePublished,
                isThreeSixty: videoAdd.isThreeSixty,
                threeSixtySettings: videoAdd.threeSixtySettings,
                coverImageId: videoAdd.coverImageId,
                hlsUrl: videoAdd.hlsUrl,
                isFlyOver: videoAdd.isFlyOver,
                isUploaded: false,
                isGenerated: false,
                isProcessing,
              },
            ],
          })
        )
      ),
      concatMapTo(this.findOne$(id, entityId, entityModel))
    );
  }

  update$(
    id: string,
    entityId: string,
    videoUpdate: VideoUpdateDto,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const foundVideo = validateVideoFound(id, documentModel);
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos.filter((video) => video.id !== id),
              {
                id,
                entityId,
                fileName: videoUpdate.fileName,
                state: videoUpdate.state,
                order: videoUpdate.order,
                isStarred: videoUpdate.isStarred,
                title: videoUpdate.title,
                description: videoUpdate.description,
                keywords: videoUpdate.keywords,
                dateCreated: foundVideo.dateCreated,
                datePublished: videoUpdate.datePublished,
                isThreeSixty: videoUpdate.isThreeSixty,
                threeSixtySettings: videoUpdate.threeSixtySettings,
                coverImageId: videoUpdate.coverImageId,
                hlsUrl: videoUpdate.hlsUrl,
                isFlyOver: videoUpdate.isFlyOver,
                isUploaded: foundVideo.isUploaded,
                isGenerated: foundVideo.isGenerated,
                isProcessing: foundVideo.isProcessing,
              },
            ],
          })
        );
      }),
      map(validateEntityFound)
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
        return loadVideo(validateVideoFound(id, documentModel));
      })
    );
  }

  findOnePublic$(
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<VideoDto> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityIsPublic),
      map((documentModel) => ({
        image: validateVideoFound(id, documentModel),
        documentModel,
      })),
      map(({ image, documentModel }) => ({
        image: validateVideoPublic(image),
        documentModel,
      })),
      map(({ image, documentModel }) =>
        loadPublicVideo(image, loadPublicContent(documentModel))
      )
    );
  }

  setDateCreated$(
    id: string,
    entityId: string,
    dateCreated: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const foundVideo = validateVideoFound(id, documentModel);
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos.filter((video) => video.id !== id),
              {
                id,
                entityId,
                fileName: foundVideo.fileName,
                state: foundVideo.state,
                order: foundVideo.order,
                isStarred: foundVideo.isStarred,
                title: foundVideo.title,
                description: foundVideo.description,
                keywords: foundVideo.keywords,
                dateCreated,
                datePublished: foundVideo.datePublished,
                isThreeSixty: foundVideo.isThreeSixty,
                coverImageId: foundVideo.coverImageId,
                hlsUrl: foundVideo.hlsUrl,
                isFlyOver: foundVideo.isFlyOver,
                isUploaded: foundVideo.isUploaded,
                isGenerated: foundVideo.isGenerated,
                isProcessing: foundVideo.isProcessing,
              },
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
      concatMap((documentModel) => {
        const foundVideo = validateVideoFound(id, documentModel);
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos.filter((video) => video.id !== id),
              {
                id,
                entityId,
                fileName: foundVideo.fileName,
                state: foundVideo.state,
                order: foundVideo.order,
                isStarred: foundVideo.isStarred,
                title: foundVideo.title,
                description: foundVideo.description,
                keywords: foundVideo.keywords,
                dateCreated: foundVideo.dateCreated,
                datePublished: foundVideo.datePublished,
                isThreeSixty: foundVideo.isThreeSixty,
                coverImageId: foundVideo.coverImageId,
                hlsUrl: foundVideo.hlsUrl,
                isFlyOver: foundVideo.isFlyOver,
                isUploaded: foundVideo.isUploaded,
                isGenerated,
                isProcessing: foundVideo.isProcessing,
              },
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
      concatMap((documentModel) => {
        const foundVideo = validateVideoFound(id, documentModel);
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...documentModel.videos.filter((video) => video.id !== id),
              {
                id,
                entityId,
                fileName: foundVideo.fileName,
                state: foundVideo.state,
                order: foundVideo.order,
                isStarred: foundVideo.isStarred,
                title: foundVideo.title,
                description: foundVideo.description,
                keywords: foundVideo.keywords,
                dateCreated: foundVideo.dateCreated,
                datePublished: foundVideo.datePublished,
                isThreeSixty: foundVideo.isThreeSixty,
                coverImageId: foundVideo.coverImageId,
                hlsUrl: foundVideo.hlsUrl,
                isFlyOver: foundVideo.isFlyOver,
                isUploaded: foundVideo.isUploaded,
                isGenerated: foundVideo.isGenerated,
                isProcessing,
              },
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
      concatMap((documentModel) =>
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
