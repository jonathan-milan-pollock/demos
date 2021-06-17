import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { EMPTY, from, Observable, of } from 'rxjs';
import { map, switchMap, switchMapTo, tap } from 'rxjs/operators';
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
        if (documentModel)
          throw new ConflictException(
            `Event ${event.group} ${event.slug} has already been created`,
            HttpStatus.FOUND
          );

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
      })
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

  delete$(id: string): Observable<void> {
    return of(this.eventModel.findByIdAndDelete(id)).pipe(switchMapTo(EMPTY));
  }
}
