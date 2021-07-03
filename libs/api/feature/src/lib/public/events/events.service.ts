import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import { Event, EntityType } from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  findAll$(): Observable<Event[]> {
    return this.entityProvider.findAllPublic$(
      EntityType.Event,
      this.eventModel
    ) as Observable<Event[]>;
  }

  findOne$(id: string): Observable<Event> {
    return this.entityProvider.findOnePublic$(
      EntityType.Event,
      id,
      this.eventModel
    ) as Observable<Event>;
  }
}
