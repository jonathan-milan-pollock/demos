import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMapTo, from, map, Observable, toArray } from 'rxjs';

import {
  Event,
  EntityType,
  EventCreateDto,
  EventUpdateDto,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityUpdateProvider,
  EntityPostProvider,
  EntityDeleteProvider,
  EventProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>,
    private readonly eventProvider: EventProvider,
    private readonly entityProvider: EntityProvider,
    private readonly entityUpdateProvider: EntityUpdateProvider,
    private readonly entityPostProvider: EntityPostProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  create$(eventCreate: EventCreateDto): Observable<Event> {
    return this.entityProvider
      .create$(
        EntityType.Event,
        eventCreate.group,
        eventCreate.slug,
        this.eventModel
      )
      .pipe(
        concatMapTo(
          from(
            new this.eventModel({
              ...this.eventProvider.loadNewEvent(
                eventCreate.group,
                eventCreate.slug
              ),
              type: EntityType.Event,
            }).save()
          )
        ),
        map(this.entityProvider.validateEntityCreate),
        map(this.eventProvider.loadEvent)
      );
  }

  update$(id: string, eventUpdate: EventUpdateDto): Observable<Event> {
    return from(this.eventModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Event,
          id,
          true,
          this.eventModel
        )
      ),
      concatMapTo(
        this.entityUpdateProvider.update$(EntityType.Event, id, this.eventModel)
      ),
      concatMapTo(this.eventModel.findByIdAndUpdate(id, { ...eventUpdate })),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Event,
          id,
          false,
          this.eventModel
        )
      ),
      concatMapTo(this.findOne$(id))
    );
  }

  post$(id: string): Observable<Event> {
    return from(this.eventModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Event,
          id,
          true,
          this.eventModel
        )
      ),
      concatMapTo(
        this.entityPostProvider.post$(EntityType.Event, id, this.eventModel)
      ),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Event,
          id,
          false,
          this.eventModel
        )
      ),
      concatMapTo(this.findOne$(id))
    );
  }

  findAll$(): Observable<Event[]> {
    return this.entityProvider
      .findAll$(EntityType.Event, this.eventModel)
      .pipe(map(this.eventProvider.loadEvent), toArray<Event>());
  }

  findOne$(id: string): Observable<Event> {
    return this.entityProvider
      .findOne$(EntityType.Event, id, this.eventModel)
      .pipe(map(this.eventProvider.loadEvent));
  }

  delete$(id: string): Observable<void> {
    return from(this.eventModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Event,
          id,
          true,
          this.eventModel
        )
      ),
      concatMapTo(
        this.entityDeleteProvider.delete$(EntityType.Event, id, this.eventModel)
      )
    );
  }
}
