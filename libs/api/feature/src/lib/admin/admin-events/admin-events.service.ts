import { HttpService, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, switchMapTo, toArray } from 'rxjs/operators';

import { Event, EntityType, ENV } from '@dark-rush-photography/shared-types';
import {
  Env,
  EventCreateDto,
  EventUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EventProvider,
  DocumentModelProvider,
  ServerlessProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEventsService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>,
    private readonly eventProvider: EventProvider,
    private readonly documentModelProvider: DocumentModelProvider,
    private readonly serverlessProvider: ServerlessProvider
  ) {}

  create$(eventCreate: EventCreateDto): Observable<Event> {
    return from(
      this.eventModel.findOne({
        type: EntityType.Event,
        group: eventCreate.group,
        slug: eventCreate.slug,
      })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel) return of(documentModel);

        return from(
          new this.eventModel(this.eventProvider.newEvent(eventCreate)).save()
        );
      }),
      map(this.documentModelProvider.validateCreate),
      map(this.eventProvider.fromDocumentModel)
    );
  }

  update$(id: string, eventUpdate: EventUpdateDto): Observable<Event> {
    return from(this.eventModel.findByIdAndUpdate(id, { ...eventUpdate })).pipe(
      map(this.documentModelProvider.validateFind),
      switchMapTo(this.findOne$(id))
    );
  }

  findAll$(): Observable<Event[]> {
    return from(this.eventModel.find({ type: EntityType.Event })).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.eventProvider.fromDocumentModel),
      toArray<Event>()
    );
  }

  findOne$(id: string): Observable<Event> {
    return from(this.eventModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.eventProvider.fromDocumentModel)
    );
  }

  post$(id: string): Observable<Event> {
    return this.findOne$(id).pipe(
      switchMapTo(
        this.serverlessProvider.post$(
          this.env.serverless,
          this.httpService,
          'post-event',
          id,
          EntityType.Event
        )
      ),
      map((response) => response as Event)
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.eventModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
