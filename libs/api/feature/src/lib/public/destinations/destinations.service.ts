import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import {
  DestinationDto,
  DestinationMinimalDto,
} from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityFindAllPublicProvider,
  EntityFindOnePublicProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>,
    private readonly entityFindAllPublicProvider: EntityFindAllPublicProvider,
    private readonly entityFindOnePublicProvider: EntityFindOnePublicProvider
  ) {}

  findAll$(): Observable<DestinationMinimalDto[]> {
    return this.entityFindAllPublicProvider
      .findAllPublic$(EntityType.Destination, this.destinationModel)
      .pipe(toArray<DestinationMinimalDto>());
  }

  findOne$(id: string): Observable<DestinationDto> {
    return this.entityFindOnePublicProvider.findOnePublic$(
      EntityType.Destination,
      id,
      this.destinationModel
    );
  }
}
