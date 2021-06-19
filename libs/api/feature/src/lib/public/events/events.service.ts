import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { Event, DocumentType } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  EventProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>,
    private readonly eventProvider: EventProvider
  ) {}

  findAll$(): Observable<Event[]> {
    return from(this.eventModel.find({ type: DocumentType.Event }).exec()).pipe(
      switchMap((documentModels) => from(documentModels)),
      map((documentModel) =>
        this.eventProvider.fromDocumentModel(documentModel)
      ),
      toArray<Event>()
    );
  }

  findOne$(id: string): Observable<Event> {
    return from(this.eventModel.findById(id).exec()).pipe(
      map((documentModel) => {
        if (!documentModel) throw new NotFoundException('Could not find event');

        return this.eventProvider.fromDocumentModel(documentModel);
      })
    );
  }
}
