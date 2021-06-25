import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { About, DocumentType } from '@dark-rush-photography/shared-types';
import {
  AboutProvider,
  Document,
  DocumentModel,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly aboutProvider: AboutProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  findAll$(): Observable<About[]> {
    return from(this.aboutModel.find({ type: DocumentType.About })).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.aboutProvider.fromDocumentModelPublic),
      toArray<About>()
    );
  }

  findOne$(id: string): Observable<About> {
    return from(this.aboutModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.aboutProvider.fromDocumentModelPublic)
    );
  }
}
