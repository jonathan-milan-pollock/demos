import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, toArray } from 'rxjs/operators';

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

  create$(slug: string): Observable<About> {
    return from(
      this.aboutModel.findOne({ type: DocumentType.About, slug })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel) return of(documentModel);

        return from(
          new this.aboutModel({
            type: DocumentType.About,
            slug,
            isPublic: true,
            images: [],
            imageDimensions: [],
            videos: [],
            videoDimensions: [],
          } as About).save()
        );
      }),
      map((documentModel) => {
        if (!documentModel) {
          throw new BadRequestException(`Unable to create about ${slug}`);
        }
        return this.aboutProvider.fromDocumentModel(documentModel);
      })
    );
  }

  findAll$(): Observable<About[]> {
    return from(this.aboutModel.find({ type: DocumentType.About }).exec()).pipe(
      switchMap((documentModels) => from(documentModels)),
      map((documentModel) =>
        this.aboutProvider.fromDocumentModel(documentModel)
      ),
      toArray<About>()
    );
  }

  findOne$(id: string): Observable<About> {
    return from(this.aboutModel.findById(id).exec()).pipe(
      map((documentModel) => {
        if (!documentModel) throw new NotFoundException('Could not find About');

        return this.aboutProvider.fromDocumentModel(documentModel);
      })
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.aboutModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
