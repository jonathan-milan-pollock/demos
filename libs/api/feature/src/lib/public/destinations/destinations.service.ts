import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { Destination, EntityType } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  DestinationProvider,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>,
    private readonly destinationProvider: DestinationProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  findAll$(): Observable<Destination[]> {
    return from(
      this.destinationModel.find({ type: EntityType.Destination })
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.destinationProvider.fromDocumentModelPublic),
      toArray<Destination>()
    );
  }

  findOne$(id: string): Observable<Destination> {
    return from(this.destinationModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.destinationProvider.fromDocumentModelPublic)
    );
  }
}
