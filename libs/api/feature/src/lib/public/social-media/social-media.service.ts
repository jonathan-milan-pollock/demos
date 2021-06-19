import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { DocumentType, SocialMedia } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  SocialMediaProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly socialMediaModel: Model<DocumentModel>,
    private readonly socialMediaProvider: SocialMediaProvider
  ) {}

  findAll$(): Observable<SocialMedia[]> {
    return from(
      this.socialMediaModel.find({ type: DocumentType.SocialMedia }).exec()
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map((documentModel) =>
        this.socialMediaProvider.fromDocumentModelPublic(documentModel)
      ),
      toArray<SocialMedia>()
    );
  }

  findOne$(id: string): Observable<SocialMedia> {
    return from(this.socialMediaModel.findById(id).exec()).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find review media');

        return this.socialMediaProvider.fromDocumentModelPublic(documentModel);
      })
    );
  }
}
