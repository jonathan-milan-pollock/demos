import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { About, DocumentType } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminAboutService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  createIfNotExists$(about: About): Observable<About> {
    return from(
      this.aboutModel.findOne({ type: DocumentType.About, slug: about.slug })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel) return of(documentModel);

        return from(
          new this.aboutModel({
            ...about,
            type: DocumentType.About,
            isPublic: true,
          }).save()
        );
      }),
      map((documentModel: DocumentModel) => {
        if (!documentModel) {
          throw new ConflictException(`Unable to create about ${about.slug}`);
        }
        return this.documentModelProvider.toAbout(documentModel);
      })
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.aboutModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
