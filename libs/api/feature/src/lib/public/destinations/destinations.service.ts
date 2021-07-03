import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import { Destination, EntityType } from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  findAll$(): Observable<Destination[]> {
    return this.entityProvider.findAllPublic$(
      EntityType.Destination,
      this.destinationModel
    ) as Observable<Destination[]>;
  }

  findOne$(id: string): Observable<Destination> {
    return this.entityProvider.findOnePublic$(
      EntityType.Destination,
      id,
      this.destinationModel
    ) as Observable<Destination>;
  }
}
