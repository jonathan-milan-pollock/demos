import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import {
  Destination,
  DestinationUpdate,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_GROUP } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminDestinationsService {
  constructor(
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly serverlessEntityProvider: ServerlessEntityProvider
  ) {}

  create$(slug: string): Observable<Destination> {
    return this.entityProvider.create$(
      EntityType.Destination,
      slug,
      this.destinationModel
    ) as Observable<Destination>;
  }

  updateProcess$(
    id: string,
    destinationUpdate: DestinationUpdate
  ): Observable<void> {
    return this.serverlessEntityProvider.updateProcess$(
      EntityType.Destination,
      id,
      this.destinationModel,
      { ...destinationUpdate, group: DEFAULT_GROUP }
    );
  }

  postProcess$(id: string): Observable<void> {
    return this.serverlessEntityProvider.postProcess$(
      EntityType.Destination,
      id,
      this.destinationModel
    );
  }

  findAll$(): Observable<Destination[]> {
    return this.entityProvider.findAll$(
      EntityType.Destination,
      this.destinationModel
    ) as Observable<Destination[]>;
  }

  findOne$(id: string): Observable<Destination> {
    return this.entityProvider.findOne$(
      EntityType.Destination,
      id,
      this.destinationModel
    ) as Observable<Destination>;
  }

  deleteProcess$(id: string): Observable<void> {
    return this.serverlessEntityProvider.deleteProcess$(
      EntityType.Destination,
      id,
      this.destinationModel
    );
  }
}
