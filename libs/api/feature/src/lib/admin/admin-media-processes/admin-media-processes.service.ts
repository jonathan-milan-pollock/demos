import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import {
  MediaProcess,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/shared-server/types';
import {
  Document,
  DocumentModel,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminMediaProcessesService {
  constructor(
    @InjectModel(Document.name)
    private readonly mediaProcessModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  create$(
    mediaProcessType: MediaProcessType,
    slug: string
  ): Observable<MediaProcess> {
    return this.entityProvider.create$(
      this.entityProvider.getEntityTypeFromMediaProcessType(mediaProcessType),
      DEFAULT_ENTITY_GROUP,
      slug,
      this.mediaProcessModel
    ) as Observable<MediaProcess>;
  }

  process$(mediaProcessType: MediaProcessType, id: string): Observable<void> {
    throw new NotImplementedException();
  }

  findAll$(mediaProcessType: MediaProcessType): Observable<MediaProcess[]> {
    return this.entityProvider.findAll$(
      this.entityProvider.getEntityTypeFromMediaProcessType(mediaProcessType),
      this.mediaProcessModel
    ) as Observable<MediaProcess[]>;
  }

  findOne$(
    mediaProcessType: MediaProcessType,
    id: string
  ): Observable<MediaProcess> {
    return this.entityProvider.findOne$(
      this.entityProvider.getEntityTypeFromMediaProcessType(mediaProcessType),
      id,
      this.mediaProcessModel
    ) as Observable<MediaProcess>;
  }

  delete$(mediaProcessType: MediaProcessType, id: string): Observable<void> {
    return this.entityProvider.delete$(
      this.entityProvider.getEntityTypeFromMediaProcessType(mediaProcessType),
      id,
      this.mediaProcessModel
    );
  }
}
