import { HttpService, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, switchMapTo, toArray } from 'rxjs/operators';

import {
  ENV,
  EntityType,
  MediaProcess,
  MediaProcessType,
} from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  DocumentModelProvider,
  MediaProcessProvider,
  ServerlessProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminMediaProcessService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly mediaModel: Model<DocumentModel>,
    private readonly mediaProcessProvider: MediaProcessProvider,
    private readonly documentModelProvider: DocumentModelProvider,
    private readonly serverlessProvider: ServerlessProvider
  ) {}

  create$(
    mediaProcessType: MediaProcessType,
    slug: string
  ): Observable<MediaProcess> {
    return from(
      this.mediaModel.findOne({
        type: this.mediaProcessProvider.findEntityType(mediaProcessType),
        slug,
      })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel) return of(documentModel);

        return from(
          new this.mediaModel(
            this.mediaProcessProvider.newMediaProcess(mediaProcessType, slug)
          ).save()
        );
      }),
      map(this.documentModelProvider.validateCreate),
      map(this.mediaProcessProvider.fromDocumentModel)
    );
  }

  findAll$(mediaProcessType: MediaProcessType): Observable<MediaProcess[]> {
    return from(
      this.mediaModel.find({
        type: this.mediaProcessProvider.findEntityType(mediaProcessType),
      })
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.mediaProcessProvider.fromDocumentModel),
      toArray<MediaProcess>()
    );
  }

  findOne$(
    mediaProcessType: MediaProcessType,
    id: string
  ): Observable<MediaProcess> {
    return from(this.mediaModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      //TODO: Need to validate that the id passed in matches with the type
      map(this.mediaProcessProvider.fromDocumentModel)
    );
  }

  process$(
    mediaProcessType: MediaProcessType,
    id: string
  ): Observable<MediaProcess> {
    return from(this.findOne$(mediaProcessType, id)).pipe(
      switchMapTo(
        this.serverlessProvider.process$(
          this.env.serverless,
          this.httpService,
          'media-process',
          id,
          EntityType.MediaProcessAppleIcon //TODO: Find the entity type from the media process type
        )
      ),
      map((response) => response as MediaProcess)
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.mediaModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
