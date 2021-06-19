import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, toArray } from 'rxjs/operators';
import { Model } from 'mongoose';

import { Event, DocumentType } from '@dark-rush-photography/shared-types';
import {
  EventCreateDto,
  EventUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EventProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>,
    private readonly eventProvider: EventProvider
  ) {}

  create$(event: EventCreateDto): Observable<Event> {
    return from(
      this.eventModel.findOne({
        type: DocumentType.Event,
        group: event.group,
        slug: event.slug,
      })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel) return of(documentModel);

        return from(
          new this.eventModel({
            type: DocumentType.Event,
            group: event.group,
            slug: event.slug,
            isPublic: false,
            keywords: [],
            useTileImage: false,
            text: [],
            images: [],
            imageDimensions: [],
            videos: [],
            videoDimensions: [],
            comments: [],
            emotions: [],
          } as Event).save()
        );
      }),
      map((documentModel: DocumentModel) => {
        if (!documentModel) {
          throw new BadRequestException(
            `Unable to create event ${event.group} ${event.slug}`
          );
        }
        return this.eventProvider.fromDocumentModel(documentModel);
      })
    );
  }

  update$(id: string, event: EventUpdateDto): Observable<Event> {
    return from(
      this.eventModel.findByIdAndUpdate(id, {
        group: event.group,
        slug: event.slug,
        isPublic: event.isPublic,
        title: event.title,
        description: event.description,
        keywords: event.keywords,
        dateCreated: event.dateCreated,
        datePublished: event.datePublished,
        location: event.location,
        useTileImage: event.useTileImage,
        text: event.text,
      } as EventUpdateDto)
    ).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException(
            `Unable to update event ${event.group} ${event.slug}`
          );

        return this.eventProvider.fromDocumentModel(documentModel);
      })
    );
  }

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
        if (!documentModel) throw new NotFoundException('Could not find Event');

        return this.eventProvider.fromDocumentModel(documentModel);
      })
    );
  }

  delete$(id: string): Observable<void> {
    return of(this.eventModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
