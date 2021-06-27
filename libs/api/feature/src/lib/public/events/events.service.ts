import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { Event, EntityType } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  EventProvider,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>,
    private readonly eventProvider: EventProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  findAll$(): Observable<Event[]> {
    return from(this.eventModel.find({ type: EntityType.Event })).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.eventProvider.fromDocumentModelPublic),
      toArray<Event>()
    );
  }

  findOne$(id: string): Observable<Event> {
    return from(this.eventModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.eventProvider.fromDocumentModelPublic)
    );
  }
}
