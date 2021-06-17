import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
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

  create$(slug: string): Observable<About> {
    return from(
      this.aboutModel.findOne({ type: DocumentType.About, slug })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel)
          throw new ConflictException(
            `About ${slug} has already been created`,
            HttpStatus.FOUND
          );

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
      map((documentModel: DocumentModel) => {
        if (!documentModel) {
          throw new BadRequestException(`Unable to create about ${slug}`);
        }
        return this.aboutProvider.fromDocumentModel(documentModel);
      })
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.aboutModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
