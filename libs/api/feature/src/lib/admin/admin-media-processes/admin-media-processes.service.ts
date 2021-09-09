import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityAdminDto,
  MediaProcessCreateDto,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/api/types';
import { getEntityTypeFromMediaProcessType } from '@dark-rush-photography/api/util';
import {
  DocumentModel,
  Document,
  loadNewEntity,
  validateEntityNotFound,
  validateEntityCreate,
  loadEntity,
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
      map(validateEntityNotFound),
      concatMap(() => {
        return from(
          new this.entityModel({
            ...loadNewEntity(
              getEntityTypeFromMediaProcessType(mediaProcessType),
              {
                ...mediaProcessCreate,
                group: DEFAULT_ENTITY_GROUP,
                isPosted: false,
              }
            ),
          }).save()
        );
      }),
      map(validateEntityCreate),
      map(loadEntity)
    );
  }
}
