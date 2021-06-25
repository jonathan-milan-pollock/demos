import { HttpService, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, iif, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, switchMapTo, toArray } from 'rxjs/operators';

import {
  PhotoOfTheWeek,
  DocumentType,
  ENV,
} from '@dark-rush-photography/shared-types';
import {
  Env,
  PhotoOfTheWeekCreateDto,
  PhotoOfTheWeekUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  PhotoOfTheWeekProvider,
  DocumentModelProvider,
  ServerlessProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminPhotoOfTheWeekService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>,
    private readonly photoOfTheWeekProvider: PhotoOfTheWeekProvider,
    private readonly documentModelProvider: DocumentModelProvider,
    private readonly serverlessProvider: ServerlessProvider
  ) {}

  create$(photoOfTheWeek: PhotoOfTheWeekCreateDto): Observable<PhotoOfTheWeek> {
    return from(
      this.photoOfTheWeekModel.findOne({
        type: DocumentType.PhotoOfTheWeek,
        group: photoOfTheWeek.group,
        slug: photoOfTheWeek.slug,
      })
    ).pipe(
      switchMap((documentModel) =>
        iif(
          () => documentModel !== null,
          of(documentModel),
          from(
            new this.photoOfTheWeekModel(
              this.photoOfTheWeekProvider.newPhotoOfTheWeek(photoOfTheWeek)
            ).save()
          )
        )
      ),
      map(this.documentModelProvider.validateCreate),
      map(this.photoOfTheWeekProvider.fromDocumentModel)
    );
  }

  update$(
    id: string,
    photoOfTheWeek: PhotoOfTheWeekUpdateDto
  ): Observable<PhotoOfTheWeek> {
    return from(
      this.photoOfTheWeekModel.findByIdAndUpdate(id, { ...photoOfTheWeek })
    ).pipe(
      map(this.documentModelProvider.validateFind),
      switchMapTo(this.findOne$(id))
    );
  }

  findAll$(): Observable<PhotoOfTheWeek[]> {
    return from(
      this.photoOfTheWeekModel.find({ type: DocumentType.PhotoOfTheWeek })
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.photoOfTheWeekProvider.fromDocumentModel),
      toArray<PhotoOfTheWeek>()
    );
  }

  findOne$(id: string): Observable<PhotoOfTheWeek> {
    return from(this.photoOfTheWeekModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.photoOfTheWeekProvider.fromDocumentModel)
    );
  }

  post$(id: string): Observable<PhotoOfTheWeek> {
    return this.findOne$(id).pipe(
      switchMapTo(
        this.serverlessProvider.post$(
          this.env.serverless,
          this.httpService,
          'post-photo-of-the-week',
          id,
          DocumentType.PhotoOfTheWeek
        )
      ),
      map((response) => response as PhotoOfTheWeek)
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.photoOfTheWeekModel.findByIdAndDelete(id)).pipe(
      mapTo(undefined)
    );
  }
}
