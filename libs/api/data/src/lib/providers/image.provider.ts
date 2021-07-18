import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { concatMap, concatMapTo, from, map, Observable } from 'rxjs';

import {
  Image,
  ImageDto,
  ImageUpdateDto,
  MediaState,
} from '@dark-rush-photography/shared/types';
import { LightroomMedia } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { getLightroomMedia } from '@dark-rush-photography/api/util';
import {
  validateEntityFound,
  validateEntityIsPublic,
} from '../entities/entity-validation.functions';
import {
  validateImageFound,
  validateImageNotAlreadyExists,
  validateImageNotProcessing,
  validateImagePublic,
} from '../content/image-validation.functions';
import { loadImage, loadPublicImage } from '../content/image.functions';
import { loadPublicContent } from '../content/public-content.functions';

@Injectable()
export class ImageProvider {
  validateImageNotAlreadyExists(
    fileName: string,
    documentModel: DocumentModel
  ): DocumentModel {
    return validateImageNotAlreadyExists(fileName, documentModel);
  }

  validateImageNotProcessing(image: Image): Image {
    return validateImageNotProcessing(image);
  }

  addUpload$(
    id: string,
    entityId: string,
    fileName: string,
    order: number,
    isThreeSixty: boolean,
    isProcessing: boolean,
    entityModel: Model<DocumentModel>
  ): Observable<Image> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        from(
          entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...documentModel.images,
              {
                id,
                entityId,
                fileName,
                state: MediaState.New,
                order,
                isStarred: false,
                isLoved: false,
                isThreeSixty,
                skipExif: false,
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
    imageUpdate: ImageUpdateDto,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const foundImage = validateImageFound(id, documentModel);
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...documentModel.images.filter((image) => image.id !== id),
              {
                id,
                entityId,
                fileName: imageUpdate.fileName,
                state: imageUpdate.state,
                order: imageUpdate.order,
                isStarred: imageUpdate.isStarred,
                isLoved: imageUpdate.isLoved,
                title: imageUpdate.title,
                description: imageUpdate.description,
                keywords: imageUpdate.keywords,
                dateCreated: foundImage.dateCreated,
                datePublished: imageUpdate.datePublished,
                isThreeSixty: foundImage.isThreeSixty,
                skipExif: foundImage.skipExif,
                isGenerated: foundImage.isGenerated,
                isProcessing: foundImage.isProcessing,
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
  ): Observable<Image> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        return loadImage(validateImageFound(id, documentModel));
      })
    );
  }

  findOnePublic$(
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<ImageDto> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityIsPublic),
      map((documentModel) => ({
        image: validateImageFound(id, documentModel),
        documentModel,
      })),
      map(({ image, documentModel }) => ({
        image: validateImagePublic(image),
        documentModel,
      })),
      map(({ image, documentModel }) =>
        loadPublicImage(image, loadPublicContent(documentModel))
      )
    );
  }

  getLightroomMedia(lightroomPath: string): LightroomMedia {
    return getLightroomMedia(lightroomPath);
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
        const foundImage = validateImageFound(id, documentModel);
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...documentModel.images.filter((image) => image.id !== id),
              {
                id,
                entityId,
                fileName: foundImage.fileName,
                state: foundImage.state,
                order: foundImage.order,
                isStarred: foundImage.isStarred,
                isLoved: foundImage.isLoved,
                title: foundImage.title,
                description: foundImage.description,
                keywords: foundImage.keywords,
                dateCreated,
                datePublished: foundImage.datePublished,
                isThreeSixty: foundImage.isThreeSixty,
                skipExif: foundImage.skipExif,
                isGenerated: foundImage.isGenerated,
                isProcessing: foundImage.isProcessing,
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
        const foundImage = validateImageFound(id, documentModel);
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...documentModel.images.filter((image) => image.id !== id),
              {
                id,
                entityId,
                fileName: foundImage.fileName,
                state: foundImage.state,
                order: foundImage.order,
                isStarred: foundImage.isStarred,
                isLoved: foundImage.isLoved,
                title: foundImage.title,
                description: foundImage.description,
                keywords: foundImage.keywords,
                dateCreated: foundImage.dateCreated,
                datePublished: foundImage.datePublished,
                isThreeSixty: foundImage.isThreeSixty,
                skipExif: foundImage.skipExif,
                isGenerated,
                isProcessing: foundImage.isProcessing,
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
        const foundImage = validateImageFound(id, documentModel);
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...documentModel.images.filter((image) => image.id !== id),
              {
                id,
                entityId,
                fileName: foundImage.fileName,
                state: foundImage.state,
                order: foundImage.order,
                isStarred: foundImage.isStarred,
                isLoved: foundImage.isLoved,
                title: foundImage.title,
                description: foundImage.description,
                keywords: foundImage.keywords,
                dateCreated: foundImage.dateCreated,
                datePublished: foundImage.datePublished,
                isThreeSixty: foundImage.isThreeSixty,
                skipExif: foundImage.skipExif,
                isGenerated: foundImage.isGenerated,
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
            images: [
              ...documentModel.images.filter((image) => image.id !== id),
            ],
            imageDimensions: [
              ...documentModel.imageDimensions.filter(
                (imageDimension) => imageDimension.imageId !== id
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
