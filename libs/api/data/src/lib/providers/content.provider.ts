import { Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';

import {
  Comment,
  ContentType,
  Emotion,
  ImageDimension,
  Image,
  Video,
  VideoDimension,
  EmotionAdd,
  CommentAdd,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateContentAdd,
  validateContentFound,
} from '../content/content-validation.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { toImage } from '../content/image.functions';
import { toImageDimension } from '../content/image-dimension.functions';
import { toVideo } from '../content/video.functions';
import { toVideoDimension } from '../content/video-dimension.functions';
import { toComment, validateAddComment } from '../content/comment.functions';
import { toEmotion, validateAddEmotion } from '../content/emotion.functions';

@Injectable()
export class ContentProvider {
  toImage(image?: Image): Image {
    if (!image) throw new NotFoundException();
    return toImage(image);
  }

  toImageDimension(imageDimension?: ImageDimension): ImageDimension {
    if (!imageDimension) throw new NotFoundException();
    return toImageDimension(imageDimension);
  }

  toVideo(video?: Video): Video {
    if (!video) throw new NotFoundException();
    return toVideo(video);
  }

  toVideoDimension(videoDimension?: VideoDimension): VideoDimension {
    if (!videoDimension) throw new NotFoundException();
    return toVideoDimension(videoDimension);
  }

  toComment(comment?: Comment): Comment {
    if (!comment) throw new NotFoundException();
    return toComment(comment);
  }

  toEmotion(emotion?: Emotion): Emotion {
    if (!emotion) throw new NotFoundException();
    return toEmotion(emotion);
  }

  validateEntityFound(documentModel: DocumentModel | null): DocumentModel {
    return validateEntityFound(documentModel);
  }

  validateAddEmotion(
    emotionAdd: EmotionAdd,
    documentModel: DocumentModel
  ): DocumentModel {
    return validateAddEmotion(emotionAdd, documentModel);
  }

  validateAddComment(
    commentAdd: CommentAdd,
    documentModel: DocumentModel
  ): DocumentModel {
    return validateAddComment(commentAdd, documentModel);
  }

  add$(
    contentType: ContentType,
    entityId: string,
    entityModel: Model<DocumentModel>,
    isContentFound: (documentModel: DocumentModel) => boolean,
    getContent: (documentModel: DocumentModel) => Partial<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        return validateContentAdd(contentType, documentModel, (documentModel) =>
          isContentFound(documentModel)
        );
      }),
      switchMap((documentModel) =>
        from(entityModel.findByIdAndUpdate(entityId, getContent(documentModel)))
      ),
      map(validateEntityFound)
    );
  }

  update$(
    contentType: ContentType,
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>,
    getContent: (documentModel: DocumentModel) => Partial<DocumentModel>
  ): Observable<DocumentModel> {
    return this.findOne$(contentType, id, entityId, entityModel).pipe(
      switchMap((documentModel) =>
        from(entityModel.findByIdAndUpdate(entityId, getContent(documentModel)))
      ),
      map(validateEntityFound)
    );
  }

  findOne$(
    contentType: ContentType,
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        return validateContentFound(contentType, id, documentModel);
      })
    );
  }

  remove$(
    _contentType: ContentType,
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>,
    removeContent: (documentModel: DocumentModel) => Partial<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(id)).pipe(
      switchMap((documentModel) =>
        documentModel
          ? from(
              entityModel.findByIdAndUpdate(
                entityId,
                removeContent(documentModel)
              )
            )
          : of()
      ),
      mapTo(undefined)
    );
  }
}
