import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  DEFAULT_ENTITY_GROUP,
  Entity,
  EntityType,
  Image,
  ImagePostCreate,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  ImageProvider,
  ImageUploadProvider,
  loadEntity,
  loadNewEntity,
  validateEntityFound,
  validateEntityNotAlreadyExists,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImagePostsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProvider: ImageProvider,
    private readonly imageUploadProvider: ImageUploadProvider
  ) {}

  create$(imagePostCreate: ImagePostCreate): Observable<Entity> {
    return from(
      this.entityModel.findOne({
        type: EntityType.ImagePost,
        group: DEFAULT_ENTITY_GROUP,
        slug: imagePostCreate.title,
      })
    ).pipe(
      map(validateEntityNotAlreadyExists),
      concatMap(() => {
        return from(
          new this.entityModel({
            ...loadNewEntity(EntityType.ImagePost, {
              ...imagePostCreate,
              watermarkedType: WatermarkedType.WithoutWatermark,
              group: DEFAULT_ENTITY_GROUP,
              slug: imagePostCreate.title,
              isPublic: true,
            }),
          }).save()
        );
      }),
      map(validateEntityFound),
      map(loadEntity)
    );
  }

  upload$(
    entityId: string,
    fileName: string,
    isThreeSixty: boolean,
    file: Express.Multer.File
  ): Observable<Image> {
    return this.imageUploadProvider
      .upload$(entityId, fileName, isThreeSixty, file)
      .pipe(
        concatMap((image) => this.imageProvider.findOne$(image.id, entityId))
      );
  }
}
