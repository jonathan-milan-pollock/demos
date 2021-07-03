import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map, switchMapTo } from 'rxjs/operators';

import {
  ContentType,
  Image,
  ImageAdd,
  ImageUpdate,
  MediaState,
  MediaType,
} from '@dark-rush-photography/shared/types';
import {
  ContentProvider,
  Document,
  DocumentModel,
  ServerlessMediaProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImagesService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentProvider: ContentProvider,
    private readonly serverlessMediaProvider: ServerlessMediaProvider
  ) {}

  add$(entityId: string, imageAdd: ImageAdd): Observable<Image> {
    const id = uuidv4();
    return this.contentProvider
      .add$(
        ContentType.Image,
        entityId,
        this.entityModel,
        (documentModel) =>
          !!documentModel.images.find(
            (image) => image.fileName == imageAdd.fileName
          ),
        (documentModel) => ({
          images: [
            ...documentModel.images,
            {
              ...imageAdd,
              id,
              entityId,
              state: MediaState.New,
              order: 0,
              isStared: false,
              isLoved: false,
              isLiked: false,
              isGenerated: false,
            },
          ],
        })
      )
      .pipe(switchMapTo(this.findOne$(id, entityId)));
  }

  uploadImage$(entityId: string, image: Express.Multer.File): Observable<void> {
    return this.serverlessMediaProvider.uploadImage$(
      entityId,
      image,
      this.entityModel
    );
  }

  uploadThreeSixtyImage$(
    entityId: string,
    threeSixtyImage: Express.Multer.File
  ): Observable<void> {
    return this.serverlessMediaProvider.uploadThreeSixtyImage$(
      entityId,
      threeSixtyImage,
      this.entityModel
    );
  }

  updateProcess$(
    id: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Observable<void> {
    return this.serverlessMediaProvider.updateImageProcess$(
      id,
      entityId,
      imageUpdate,
      this.entityModel
    );
  }

  update$(
    id: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Observable<Image> {
    return this.contentProvider
      .update$(
        ContentType.Image,
        id,
        entityId,
        this.entityModel,
        (documentModel) => {
          const foundImage = documentModel.images.find(
            (image) => image.id == id
          );
          return {
            images: [
              ...documentModel.images.filter((image) => image.id !== id),
              { ...foundImage, ...imageUpdate },
            ],
          } as Partial<DocumentModel>;
        }
      )
      .pipe(switchMapTo(this.findOne$(id, entityId)));
  }

  postProcess$(id: string, entityId: string): Observable<void> {
    return this.serverlessMediaProvider.postProcess$(
      MediaType.Image,
      id,
      entityId,
      this.entityModel
    );
  }

  findOne$(id: string, entityId: string): Observable<Image> {
    return this.contentProvider
      .findOne$(ContentType.Image, id, entityId, this.entityModel)
      .pipe(
        map((documentModel) =>
          this.contentProvider.toImage(
            documentModel.images.find((image) => image.id == id)
          )
        )
      );
  }

  removeProcess$(id: string, entityId: string): Observable<void> {
    return this.serverlessMediaProvider.removeProcess$(
      MediaType.Image,
      id,
      entityId,
      this.entityModel
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return this.contentProvider.remove$(
      ContentType.Image,
      id,
      entityId,
      this.entityModel,
      (documentModel) => {
        return {
          images: [...documentModel.images.filter((image) => image.id !== id)],
        } as Partial<DocumentModel>;
      }
    );
  }
}
