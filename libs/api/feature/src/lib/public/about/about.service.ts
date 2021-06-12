import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';
import { Model } from 'mongoose';

import { About, DocumentType } from '@dark-rush-photography/shared-types';
import {
  Document,
  DocumentModel,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  findAll(): Observable<About[]> {
    return from(this.aboutModel.find({ type: DocumentType.About }).exec()).pipe(
      switchMap((documentModels) => from(documentModels)),
      map((documentModel) => this.documentModelProvider.toAbout(documentModel)),
      toArray<About>()
    );
  }

  findOne(slug: string): Observable<About> {
    return from(
      this.aboutModel.findOne({ type: DocumentType.About, slug }).exec()
    ).pipe(
      map((documentModel) => {
        if (!documentModel) throw new NotFoundException('Could not find About');

        return this.documentModelProvider.toAbout(documentModel);
      })
    );
  }
}
