import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { map, Observable, toArray } from 'rxjs';

import {
  EntityType,
  EventMinimalDto,
  EventDto,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityLoadProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly entityLoadProvider: EntityLoadProvider
  ) {}

  findAll$(): Observable<EventMinimalDto[]> {
    return this.entityProvider
      .findAllPublic$(EntityType.Event, this.eventModel)
      .pipe(
        map(this.entityLoadProvider.loadMinimalEventPublic),
        toArray<EventMinimalDto>()
      );
  }

  findOne$(id: string): Observable<EventDto> {
    return this.entityProvider
      .findOnePublic$(EntityType.Event, id, this.eventModel)
      .pipe(map(this.entityLoadProvider.loadEventPublic));
  }
}
