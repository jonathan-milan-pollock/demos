import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  DEFAULT_ENTITY_GROUP,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import {
  EntityAdminDto,
  MediaProcessCreateDto,
} from '@dark-rush-photography/api/types';
import { getEntityTypeFromMediaProcessType } from '@dark-rush-photography/shared/util';
import {
  DocumentModel,
  Document,
  loadNewEntity,
  validateEntityNotAlreadyExists,
  loadEntity,
  validateEntityFound,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminMediaProcessesService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  create$(
    mediaProcessType: MediaProcessType,
    mediaProcessCreate: MediaProcessCreateDto
  ): Observable<EntityAdminDto> {
    return from(
      this.entityModel.findOne({
        type: getEntityTypeFromMediaProcessType(mediaProcessType),
        group: DEFAULT_ENTITY_GROUP,
        slug: mediaProcessCreate.slug,
      })
    ).pipe(
      map(validateEntityNotAlreadyExists),
      concatMap(() => {
        return from(
          new this.entityModel({
            ...loadNewEntity(
              getEntityTypeFromMediaProcessType(mediaProcessType),
              {
                ...mediaProcessCreate,
                group: DEFAULT_ENTITY_GROUP,
                isPublic: false,
              }
            ),
          }).save()
        );
      }),
      map(validateEntityFound),
      map(loadEntity)
    );
  }
}
