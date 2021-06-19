import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { EMPTY, from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, switchMapTo } from 'rxjs/operators';
import { Model } from 'mongoose';

import {
  PhotoOfTheWeek,
  DocumentType,
} from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  PhotoOfTheWeekProvider,
} from '@dark-rush-photography/api/data';
import {
  PhotoOfTheWeekCreateDto,
  PhotoOfTheWeekUpdateDto,
} from '@dark-rush-photography/api/types';

@Injectable()
export class AdminPhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>,
    private readonly photoOfTheWeekProvider: PhotoOfTheWeekProvider
  ) {}

  create$(photoOfTheWeek: PhotoOfTheWeekCreateDto): Observable<PhotoOfTheWeek> {
    return from(
      this.photoOfTheWeekModel.findOne({
        type: DocumentType.PhotoOfTheWeek,
        group: photoOfTheWeek.group,
        slug: photoOfTheWeek.slug,
      })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel)
          throw new ConflictException(
            `Photo of the week ${photoOfTheWeek.group} ${photoOfTheWeek.slug} has already been created`,
            HttpStatus.FOUND
          );

        return from(
          new this.photoOfTheWeekModel({
            type: DocumentType.PhotoOfTheWeek,
            group: photoOfTheWeek.group,
            slug: photoOfTheWeek.slug,
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
          } as PhotoOfTheWeek).save()
        );
      }),
      map((documentModel: DocumentModel) => {
        if (!documentModel) {
          throw new BadRequestException(
            `Unable to create event ${photoOfTheWeek.group} ${photoOfTheWeek.slug}`
          );
        }
        return this.photoOfTheWeekProvider.fromDocumentModel(documentModel);
      })
    );
  }

  update$(
    id: string,
    photoOfTheWeek: PhotoOfTheWeekUpdateDto
  ): Observable<PhotoOfTheWeek> {
    return from(
      this.photoOfTheWeekModel.findByIdAndUpdate(id, {
        group: photoOfTheWeek.group,
        slug: photoOfTheWeek.slug,
        isPublic: photoOfTheWeek.isPublic,
        title: photoOfTheWeek.title,
        description: photoOfTheWeek.description,
        keywords: photoOfTheWeek.keywords,
        datePublished: photoOfTheWeek.datePublished,
        location: photoOfTheWeek.location,
        useTileImage: photoOfTheWeek.useTileImage,
        text: photoOfTheWeek.text,
      })
    ).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException(
            `Unable to update event ${photoOfTheWeek.group} ${photoOfTheWeek.slug}`
          );

        return this.photoOfTheWeekProvider.fromDocumentModel(documentModel);
      })
    );
  }

  delete$(id: string): Observable<void> {
    return of(this.photoOfTheWeekModel.findByIdAndDelete(id)).pipe(
      mapTo(undefined)
    );
  }
}
