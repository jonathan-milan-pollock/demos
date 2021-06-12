import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { EMPTY, from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { Event } from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>
  ) {}

  create(event: Event): Observable<Event> {
    return of(new this.eventModel(event)).pipe(switchMap((e) => e.save()));
  }

  update(id: string, event: Event): Observable<Event> {
    return from(this.eventModel.findById(id)).pipe(
      tap((e) => {
        if (!e) {
          throw new NotFoundException('Could not find event');
        }
      }),
      //switchMap(() => this.eventModel.findByIdAndUpdate(id, event)),
      map((e) => e as Event)
    );
  }

  delete(id: string): Observable<void> {
    return of(this.eventModel.findByIdAndDelete(id)).pipe(
      switchMap(() => EMPTY)
    );
  }
}
