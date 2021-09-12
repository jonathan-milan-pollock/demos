import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import {
  DestinationDto,
  DestinationMinimalDto,
  EntityType,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  DestinationProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly destinationProvider: DestinationProvider
  ) {}

  findAll$(): Observable<DestinationMinimalDto[]> {
    return this.entityProvider
      .findAllPublic$(EntityType.Destination, this.destinationModel)
      .pipe(
        map(this.destinationProvider.loadMinimalDestinationPublic),
        toArray<DestinationMinimalDto>()
      );
  }

  findOne$(id: string): Observable<DestinationDto> {
    return this.entityProvider
      .findOnePublic$(EntityType.Destination, id, this.destinationModel)
      .pipe(map(this.destinationProvider.loadDestinationPublic));
  }
}
