import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import { About, EntityType } from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminAboutService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly serverlessEntityProvider: ServerlessEntityProvider
  ) {}

  create$(slug: string): Observable<About> {
    return this.entityProvider.create$(
      EntityType.About,
      slug,
      this.aboutModel
    ) as Observable<About>;
  }

  findAll$(): Observable<About[]> {
    return this.entityProvider.findAll$(
      EntityType.About,
      this.aboutModel
    ) as Observable<About[]>;
  }

  findOne$(id: string): Observable<About> {
    return this.entityProvider.findOne$(
      EntityType.About,
      id,
      this.aboutModel
    ) as Observable<About>;
  }

  deleteProcess$(id: string): Observable<void> {
    return this.serverlessEntityProvider.deleteProcess$(
      EntityType.About,
      id,
      this.aboutModel
    );
  }
}
