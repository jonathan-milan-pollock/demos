import { HttpService, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, switchMapTo, toArray } from 'rxjs/operators';

import {
  Destination,
  EntityType,
  ENV,
} from '@dark-rush-photography/shared-types';
import { DestinationUpdateDto, Env } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  DestinationProvider,
  DocumentModelProvider,
  ServerlessProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminDestinationsService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>,
    private readonly destinationProvider: DestinationProvider,
    private readonly documentModelProvider: DocumentModelProvider,
    private readonly serverlessProvider: ServerlessProvider
  ) {}

  create$(slug: string): Observable<Destination> {
    return from(
      this.destinationModel.findOne({ type: EntityType.Destination, slug })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel) return of(documentModel);

        return from(
          new this.destinationModel(
            this.destinationProvider.newDestination(slug)
          ).save()
        );
      }),
      map(this.documentModelProvider.validateCreate),
      map(this.destinationProvider.fromDocumentModel)
    );
  }

  update$(
    id: string,
    destinationUpdate: DestinationUpdateDto
  ): Observable<Destination> {
    return from(
      this.destinationModel.findByIdAndUpdate(id, { ...destinationUpdate })
    ).pipe(
      map(this.documentModelProvider.validateFind),
      switchMapTo(this.findOne$(id))
    );
  }

  findAll$(): Observable<Destination[]> {
    return from(
      this.destinationModel.find({ type: EntityType.Destination })
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.destinationProvider.fromDocumentModel),
      toArray<Destination>()
    );
  }

  findOne$(id: string): Observable<Destination> {
    return from(this.destinationModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.destinationProvider.fromDocumentModel)
    );
  }

  post$(id: string): Observable<Destination> {
    return this.findOne$(id).pipe(
      switchMapTo(
        this.serverlessProvider.post$(
          this.env.serverless,
          this.httpService,
          'post-destination',
          id,
          EntityType.Destination
        )
      ),
      map((response) => response as Destination)
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.destinationModel.findByIdAndDelete(id)).pipe(
      mapTo(undefined)
    );
  }
}
