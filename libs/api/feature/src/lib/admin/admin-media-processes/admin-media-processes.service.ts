import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import {
  MediaProcess,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import {
  Document,
  DocumentModel,
  EntityProvider,
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminMediaProcessesService {
  constructor(
    @InjectModel(Document.name)
    private readonly mediaProcessModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly serverlessEntityProvider: ServerlessEntityProvider
  ) {}

  create$(
    mediaProcessType: MediaProcessType,
    slug: string
  ): Observable<MediaProcess> {
    return this.entityProvider.create$(
      this.entityProvider.getEntityTypeFromMediaProcessType(mediaProcessType),
      slug,
      this.mediaProcessModel
    ) as Observable<MediaProcess>;
  }

  process$(mediaProcessType: MediaProcessType, id: string): Observable<void> {
    return this.serverlessEntityProvider.mediaProcess$(
      this.entityProvider.getEntityTypeFromMediaProcessType(mediaProcessType),
      id,
      this.mediaProcessModel
    );
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

  deleteProcess$(
    mediaProcessType: MediaProcessType,
    id: string
  ): Observable<void> {
    return this.serverlessEntityProvider.deleteProcess$(
      this.entityProvider.getEntityTypeFromMediaProcessType(mediaProcessType),
      id,
      this.mediaProcessModel
    );
  }
}
