import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import { EventMinimalDto, EventDto } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityFindAllPublicProvider,
  EntityFindOnePublicProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>,
    private readonly entityFindAllPublicProvider: EntityFindAllPublicProvider,
    private readonly entityFindOnePublicProvider: EntityFindOnePublicProvider
  ) {}

  findAll$(): Observable<EventMinimalDto[]> {
    return this.entityFindAllPublicProvider
      .findAllPublic$(EntityType.Event, this.eventModel)
      .pipe(toArray<EventMinimalDto>());
  }

  findOne$(id: string): Observable<EventDto> {
    return this.entityFindOnePublicProvider.findOnePublic$(
      EntityType.Event,
      id,
      this.eventModel
    );
  }
}
