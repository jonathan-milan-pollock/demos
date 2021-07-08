import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';

import {
  Event,
  EntityType,
  EventCreate,
  EventUpdate,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { concatMapTo, map } from 'rxjs/operators';

@Injectable()
export class AdminEventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  create$(eventCreate: EventCreate): Observable<Event> {
    return this.entityProvider.create$(
      EntityType.Event,
      eventCreate.group,
      eventCreate.slug,
      this.eventModel
    ) as Observable<Event>;
  }

  update$(id: string, eventUpdate: EventUpdate): Observable<Event> {
    return from(this.eventModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      concatMapTo(this.eventModel.findByIdAndUpdate(id, { ...eventUpdate })),
      concatMapTo(
        this.entityProvider.findOne$(
          EntityType.Event,
          id,
          this.eventModel
        ) as Observable<Event>
      )
    );
  }

  post$(id: string): Observable<void> {
    throw new NotImplementedException();
  }

  findAll$(): Observable<Event[]> {
    return this.entityProvider.findAll$(
      EntityType.Event,
      this.eventModel
    ) as Observable<Event[]>;
  }

  findOne$(id: string): Observable<Event> {
    return this.entityProvider.findOne$(
      EntityType.Event,
      id,
      this.eventModel
    ) as Observable<Event>;
  }

  delete$(id: string): Observable<void> {
    return this.entityProvider.delete$(EntityType.Event, id, this.eventModel);
  }
}
