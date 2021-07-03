import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

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
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly serverlessEntityProvider: ServerlessEntityProvider
  ) {}

  create$(eventCreate: EventCreate): Observable<Event> {
    return this.entityProvider.create$(
      EntityType.Event,
      eventCreate.slug,
      this.eventModel,
      eventCreate.group
    ) as Observable<Event>;
  }

  updateProcess$(id: string, eventUpdate: EventUpdate): Observable<void> {
    return this.serverlessEntityProvider.updateProcess$(
      EntityType.Event,
      id,
      this.eventModel,
      { ...eventUpdate, hasExtendedReality: false, socialMediaUrls: [] }
    );
  }

  postProcess$(id: string): Observable<void> {
    return this.serverlessEntityProvider.postProcess$(
      EntityType.Event,
      id,
      this.eventModel
    );
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

  deleteProcess$(id: string): Observable<void> {
    return this.serverlessEntityProvider.deleteProcess$(
      EntityType.Event,
      id,
      this.eventModel
    );
  }
}
