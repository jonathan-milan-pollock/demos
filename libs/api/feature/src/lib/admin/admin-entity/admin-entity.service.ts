import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, toArray } from 'rxjs/operators';

import { About, EntityType } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  DocumentModelProvider,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEntityService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  create$(slug: string): Observable<About> {
    return from(
      this.entityModel.findOne({ type: EntityType.About, slug })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel) return of(documentModel);

        return from(
          new this.entityModel(this.entityProvider.newEntity(slug)).save()
        );
      }),
      map(this.documentModelProvider.validateCreate),
      map(this.entityProvider.fromDocumentModel)
    );
  }

  findAll$(): Observable<About[]> {
    return from(this.entityModel.find({ type: EntityType.About })).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.entityProvider.fromDocumentModel),
      toArray<About>()
    );
  }

  findOne$(id: string): Observable<About> {
    return from(this.entityModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.entityProvider.fromDocumentModel)
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.entityModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
