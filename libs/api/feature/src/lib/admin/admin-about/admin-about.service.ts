import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { About, DocumentType } from '@dark-rush-photography/shared-types';
import {
  AboutProvider,
  DocumentModel,
  Document,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminAboutService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly aboutProvider: AboutProvider
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
          throw new BadRequestException(`Unable to create about ${about.slug}`);
        }
        return this.aboutProvider.fromDocumentModel(documentModel);
      })
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.aboutModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
