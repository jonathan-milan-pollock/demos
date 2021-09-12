import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  Image,
  ImageDto,
  ImageUpdateDto,
  MediaState,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  validateEntityFound,
  validateEntityIsPosted,
} from '../entities/entity-validation.functions';
import {
  validateImageFound,
  validateImageNotAlreadyExists,
  validateImagePublic,
} from '../content/image-validation.functions';
import { loadImage, loadPublicImage } from '../content/image.functions';
import { loadPublicContent } from '../content/public-content.functions';

@Injectable()
export class ImageProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  validateImageNotAlreadyExists(
    fileName: string,
    documentModel: DocumentModel
  ): DocumentModel {
    return validateImageNotAlreadyExists(fileName, documentModel);
  }

  add$(
    id: string,
    entityId: string,
    fileName: string,
    order: number,
    isThreeSixty: boolean
  ): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        from(
          this.entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...documentModel.images,
              {
                id,
                entityId,
                state: MediaState.New,
                blobPathId: uuidv4(),
                fileName,
                order,
                isStarred: false,
                isLoved: false,
                skipExif: false,
                isThreeSixty,
              },
            ],
          })
        )
      ),
      concatMap(() => this.findOne$(id, entityId))
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
                state: foundImage.state,
                blobPathId: foundImage.blobPathId,
                fileName: imageUpdate.fileName,
                order: imageUpdate.order,
                isStarred: imageUpdate.isStarred,
                isLoved: imageUpdate.isLoved,
                title: imageUpdate.title,
                seoDescription: imageUpdate.description,
                seoKeywords: imageUpdate.keywords,
                dateCreated: foundImage.dateCreated,
                datePublished: imageUpdate.datePublished,
                skipExif: foundImage.skipExif,
                isThreeSixty: foundImage.isThreeSixty,
              },
            ],
          })
        );
      }),
      map(validateEntityFound)
    );
  }

  findOne$(id: string, entityId: string): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
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
      map(validateEntityIsPosted),
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

  changeState$(
    id: string,
    entityId: string,
    previousState: MediaState,
    newState: MediaState,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    if (
      !(
        (previousState === MediaState.New &&
          newState === MediaState.Selected) ||
        (previousState === MediaState.Selected &&
          newState === MediaState.Published) ||
        (previousState === MediaState.Published &&
          newState === MediaState.Archived) ||
        (previousState === MediaState.Archived &&
          newState === MediaState.Published)
      )
    ) {
      throw new ConflictException('Invalid change in state');
    }
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
                state: newState,
                blobPathId: foundImage.blobPathId,
                fileName: foundImage.fileName,
                order: foundImage.order,
                isStarred: foundImage.isStarred,
                isLoved: foundImage.isLoved,
                title: foundImage.title,
                seoDescription: foundImage.seoDescription,
                seoKeywords: foundImage.seoKeywords,
                dateCreated: foundImage.dateCreated,
                datePublished: foundImage.datePublished,
                skipExif: foundImage.skipExif,
                isThreeSixty: foundImage.isThreeSixty,
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
