import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  DEFAULT_ENTITY_GROUP,
  EntityMinimalAdmin,
  EntityType,
  ImageAdmin,
  ImagePostCreate,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  ImageUploadProvider,
  createEntity$,
  Document,
  DocumentModel,
  validateEntityFound,
  loadEntityMinimalAdmin,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImagePostsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentUploadProvider: ImageUploadProvider
  ) {}

  create$(imagePostCreate: ImagePostCreate): Observable<EntityMinimalAdmin> {
    return createEntity$(
      EntityType.ImagePost,
      WatermarkedType.WithoutWatermark,
      DEFAULT_ENTITY_GROUP,
      imagePostCreate.slug,
      this.entityModel
    ).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        from(
          this.entityModel.findByIdAndUpdate(documentModel._id, {
            text: imagePostCreate.text,
          })
        )
      ),
      map(validateEntityFound),
      map(loadEntityMinimalAdmin)
    );
  }

  upload$(
    entityId: string,
    fileName: string,
    file: Express.Multer.File
  ): Observable<ImageAdmin> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap(() =>
        this.contentUploadProvider.uploadImage$(entityId, fileName, file)
      )
    );
  }
}
