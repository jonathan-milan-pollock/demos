import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';

import {
  Destination,
  DestinationUpdate,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/shared-server/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { map, concatMapTo } from 'rxjs/operators';

@Injectable()
export class AdminDestinationsService {
  constructor(
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  create$(slug: string): Observable<Destination> {
    return this.entityProvider.create$(
      EntityType.Destination,
      DEFAULT_ENTITY_GROUP,
      slug,
      this.destinationModel
    ) as Observable<Destination>;
  }

  update$(
    id: string,
    destinationUpdate: DestinationUpdate
  ): Observable<Destination> {
    return from(this.destinationModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      concatMapTo(
        this.destinationModel.findByIdAndUpdate(id, { ...destinationUpdate })
      ),
      concatMapTo(
        this.entityProvider.findOne$(
          EntityType.Destination,
          id,
          this.destinationModel
        ) as Observable<Destination>
      )
    );
  }

  post$(id: string): Observable<void> {
    throw new NotImplementedException();
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

  delete$(id: string): Observable<void> {
    return this.entityProvider.delete$(
      EntityType.Destination,
      id,
      this.destinationModel
    );
  }
}
