import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap, toArray } from 'rxjs/operators';

import { Destination, DocumentType } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  DestinationProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>,
    private readonly destinationProvider: DestinationProvider
  ) {}

  findAll$(): Observable<Destination[]> {
    return from(
      this.destinationModel.find({ type: DocumentType.Destination }).exec()
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map((documentModel) =>
        this.destinationProvider.fromDocumentModel(documentModel)
      ),
      toArray<Destination>()
    );
  }

  findOne$(id: string): Observable<Destination> {
    return from(this.destinationModel.findById(id).exec()).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find destination');

        return this.destinationProvider.fromDocumentModel(documentModel);
      })
    );
  }
}
