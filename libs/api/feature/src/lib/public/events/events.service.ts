import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { Event, DocumentType } from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>
  ) {}

  findAll(): Observable<Event[]> {
    return from(this.eventModel.find({ type: DocumentType.Event }).exec());
  }

  findOne(id: string): Observable<Event> {
    return from(this.eventModel.findById(id)).pipe(
      tap((e) => {
        if (!e) {
          throw new NotFoundException('Could not find event');
        }
      }),
      map((e) => e as Event)
    );
  }
}
