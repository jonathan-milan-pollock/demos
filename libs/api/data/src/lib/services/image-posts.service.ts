import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  DEFAULT_ENTITY_GROUP,
  EntityMinimalAdmin,
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  createImagePostEntity$,
  findEntityById$,
} from '../entities/entity-repository.functions';
import { loadEntityMinimalAdmin } from '../entities/entity-load-admin.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ImageAddProvider } from '../providers/image-add.provider';

@Injectable()
export class ImagePostsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageAddProvider: ImageAddProvider
  ) {}

  create$(
    fileName: string,
    text: string,
    file: Express.Multer.File
  ): Observable<EntityMinimalAdmin> {
    return createImagePostEntity$(
      EntityType.ImagePost,
      WatermarkedType.WithoutWatermark,
      DEFAULT_ENTITY_GROUP,
      uuidv4(),
      text,
      this.entityModel
    ).pipe(
      concatMap((documentModel) =>
        this.imageAddProvider
          .addUploadImage$(documentModel._id, fileName, file)
          .pipe(
            concatMap(() =>
              findEntityById$(documentModel._id, this.entityModel)
            ),
            map(validateEntityFound),
            map(loadEntityMinimalAdmin)
          )
      )
    );
  }
}
