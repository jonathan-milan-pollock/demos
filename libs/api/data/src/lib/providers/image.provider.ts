import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Image, MediaState } from '@dark-rush-photography/shared/types';
import { ImageDto, ImageUpdateDto } from '@dark-rush-photography/api/types';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  validateEntityFound,
  validateEntityIsPublic,
} from '../entities/entity-validation.functions';
import {
  validateImageFoundInEntity,
  validateImagePublic,
} from '../content/image-validation.functions';
import { loadImage, loadPublicImage } from '../content/image.functions';

@Injectable()
export class ImageProvider {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(ImageProvider.name);
  }

  add$(
    id: string,
    entityId: string,
    state: MediaState,
    fileName: string,
    order: number,
    isThreeSixty: boolean
  ): Observable<Image> {
    this.logger.log(`Adding ${fileName}`);
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
                state,
                blobPathId: uuidv4(),
                fileName,
                order,
                isStarred: false,
                isLoved: false,
                title: '',
                seoDescription: '',
                seoKeywords: '',
                isThreeSixty,
              },
            ],
          })
        )
      ),
      concatMap(() => this.findOne$(id, entityId))
    );
  }

  clone$(
    previousImage: Image,
    newId: string,
    newState: MediaState,
    imageUpdate: ImageUpdateDto
  ): Observable<Image> {
    this.logger.log(`Cloning ${previousImage.fileName}`);
    return from(this.entityModel.findById(previousImage.entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        from(
          this.entityModel.findByIdAndUpdate(previousImage.entityId, {
            images: [
              ...documentModel.images,
              {
                id: newId,
                entityId: previousImage.entityId,
                state: newState,
                blobPathId: uuidv4(),
                fileName: imageUpdate.fileName,
                order: imageUpdate.order,
                isStarred: imageUpdate.isStarred,
                isLoved: imageUpdate.isLoved,
                title: imageUpdate.title,
                seoDescription: imageUpdate.seoDescription,
                seoKeywords: imageUpdate.seoKeywords,
                dateCreated: imageUpdate.dateCreated,
                datePublished: imageUpdate.datePublished,
                isThreeSixty: previousImage.isThreeSixty,
              },
            ],
          })
        )
      ),
      concatMap(() => this.findOne$(newId, previousImage.entityId))
    );
  }

  update$(
    id: string,
    entityId: string,
    imageUpdate: ImageUpdateDto
  ): Observable<DocumentModel> {
    this.logger.log(`Updating ${imageUpdate.fileName}`);
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const foundImage = validateImageFoundInEntity(id, documentModel);
        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
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
                seoDescription: imageUpdate.seoDescription,
                seoKeywords: imageUpdate.seoKeywords,
                dateCreated: imageUpdate.dateCreated,
                datePublished: imageUpdate.datePublished,
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
        return loadImage(validateImageFoundInEntity(id, documentModel));
      })
    );
  }

  findOnePublic$(id: string, entityId: string): Observable<ImageDto> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(validateEntityIsPublic),
      map((documentModel) => validateImageFoundInEntity(id, documentModel)),
      map(validateImagePublic),
      map(loadPublicImage)
    );
  }

  changeState$(
    id: string,
    entityId: string,
    previousState: MediaState,
    newState: MediaState
  ): Observable<DocumentModel> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const foundImage = validateImageFoundInEntity(id, documentModel);
        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
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
                isThreeSixty: foundImage.isThreeSixty,
              },
            ],
          })
        );
      }),
      map(validateEntityFound)
    );
  }

  remove$(id: string, entityId: string): Observable<DocumentModel> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        from(
          this.entityModel.findByIdAndUpdate(entityId, {
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
