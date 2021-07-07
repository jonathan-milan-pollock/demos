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
  Image,
  MediaState,
  MediaType,
  ImageUpdate,
  Media,
} from '@dark-rush-photography/shared/types';
import { LightroomMedia } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { getLightroomMedia } from '@dark-rush-photography/api/util';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { getEntityTypeAllowsImageAdd } from '../content/entity-type-allows-image-add.functions';
import { toImage } from '../content/image.functions';

@Injectable()
export class ImageProvider {
  validateImageNotFound(
    fileName: string,
    documentModel: DocumentModel
  ): DocumentModel {
    const foundImage = documentModel.images.find(
      (image) => image.fileName == fileName
    );
    if (foundImage)
      throw new ConflictException(
        `Image with file name ${fileName} already exists`,
        HttpStatus.FOUND
      );
    return documentModel;
  }

  validateImageNotProcessing(image: Image): Image {
    if (image.isProcessing)
      throw new ConflictException(
        'Image cannot be modified as it currently being processed',
        HttpStatus.NOT_ACCEPTABLE
      );
    return image;
  }

  validateCanAddImageToEntity(documentModel: DocumentModel): DocumentModel {
    if (!getEntityTypeAllowsImageAdd(documentModel.type)) {
      throw new BadRequestException(
        `Images cannot be added to entity type ${documentModel.type}`
      );
    }
    return documentModel;
  }

  add$(
    id: string,
    entityId: string,
    fileName: string,
    isProcessing: boolean,
    entityModel: Model<DocumentModel>
  ): Observable<Image> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) =>
        from(
          entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...documentModel.images,
              {
                id,
                entityId,
                fileName,
                state: MediaState.New,
                order: 0,
                isStared: false,
                isLoved: false,
                title: '',
                description: '',
                keywords: '',
                dateCreated: '',
                datePublished: '',
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
    imageUpdate: ImageUpdate,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) => {
        const foundImage = documentModel.images.find(
          (image) => image.id === id
        );
        if (!foundImage) throw new NotFoundException();

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
                isStared: imageUpdate.isStared,
                isLoved: imageUpdate.isLoved,
                title: imageUpdate.title ?? '',
                description: imageUpdate.description ?? '',
                keywords: imageUpdate.keywords ?? '',
                dateCreated: foundImage.dateCreated,
                datePublished: imageUpdate.datePublished ?? '',
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
        const foundImage = documentModel.images.find((image) => image.id == id);
        if (!foundImage) throw new NotFoundException('Could not find image');

        return toImage(foundImage);
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
      type: MediaType.Image,
      id,
      fileName,
      state,
      entityType: documentModel.type,
      entityId: documentModel._id,
      entityGroup: documentModel.group,
      entitySlug: documentModel.slug,
    };
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
      switchMap((documentModel) => {
        const foundImage = documentModel.images.find(
          (image) => image.id === id
        );
        if (!foundImage) throw new NotFoundException();

        return from(
          entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...documentModel.images.filter((image) => image.id !== id),
              {
                id: foundImage.id,
                entityId: foundImage.entityId,
                fileName: foundImage.fileName,
                state: foundImage.state,
                order: foundImage.order,
                isStared: foundImage.isStared,
                isLoved: foundImage.isLoved,
                title: foundImage.title,
                description: foundImage.description,
                keywords: foundImage.keywords,
                dateCreated: dateCreated,
                datePublished: foundImage.datePublished,
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
      switchMap((documentModel) => {
        const foundImage = documentModel.images.find(
          (image) => image.id === id
        );
        if (!foundImage) throw new NotFoundException();

        return from(
          entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...documentModel.images.filter((image) => image.id !== id),
              {
                id: foundImage.id,
                entityId: foundImage.entityId,
                fileName: foundImage.fileName,
                state: foundImage.state,
                order: foundImage.order,
                isStared: foundImage.isStared,
                isLoved: foundImage.isLoved,
                title: foundImage.title,
                description: foundImage.description,
                keywords: foundImage.keywords,
                dateCreated: foundImage.dateCreated,
                datePublished: foundImage.datePublished,
                isGenerated: isGenerated,
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
      switchMap((documentModel) => {
        const foundImage = documentModel.images.find(
          (image) => image.id === id
        );
        if (!foundImage) throw new NotFoundException();

        return from(
          entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...documentModel.images.filter((image) => image.id !== id),
              {
                id: foundImage.id,
                entityId: foundImage.entityId,
                fileName: foundImage.fileName,
                state: foundImage.state,
                order: foundImage.order,
                isStared: foundImage.isStared,
                isLoved: foundImage.isLoved,
                title: foundImage.title,
                description: foundImage.description,
                keywords: foundImage.keywords,
                dateCreated: foundImage.dateCreated,
                datePublished: foundImage.datePublished,
                isGenerated: foundImage.isGenerated,
                isProcessing: isProcessing,
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
      switchMap((documentModel) =>
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
