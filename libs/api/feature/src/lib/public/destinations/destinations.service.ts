import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import {
  DestinationDto,
  DestinationMinimalDto,
} from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityPublicProvider,
  DestinationProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>,
    private readonly entityProvider: EntityPublicProvider,
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
