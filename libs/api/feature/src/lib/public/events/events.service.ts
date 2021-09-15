import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { map, Observable, toArray } from 'rxjs';

import { EntityType } from '@dark-rush-photography/shared/types';
import { EventMinimalDto, EventDto } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityPublicProvider,
  EventProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>,
    private readonly entityProvider: EntityPublicProvider,
    private readonly eventProvider: EventProvider
  ) {}

  findAll$(): Observable<EventMinimalDto[]> {
    return this.entityProvider
      .findAllPublic$(EntityType.Event, this.eventModel)
      .pipe(
        map(this.eventProvider.loadMinimalEventPublic),
        toArray<EventMinimalDto>()
      );
  }

  findOne$(id: string): Observable<EventDto> {
    return this.entityProvider
      .findOnePublic$(EntityType.Event, id, this.eventModel)
      .pipe(map(this.eventProvider.loadEventPublic));
  }
}
