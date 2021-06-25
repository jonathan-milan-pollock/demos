import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, iif, Observable, of } from 'rxjs';
import { map, mapTo, mergeMap, switchMap, toArray } from 'rxjs/operators';

import { DocumentType, SocialMedia } from '@dark-rush-photography/shared-types';
import { SocialMediaCreateDto } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  SocialMediaProvider,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminSocialMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly socialMediaModel: Model<DocumentModel>,
    private readonly socialMediaProvider: SocialMediaProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  create$(socialMedia: SocialMediaCreateDto): Observable<SocialMedia> {
    return from(
      this.socialMediaModel.findOne({
        type: DocumentType.SocialMedia,
        group: socialMedia.group,
        slug: socialMedia.slug,
      })
    ).pipe(
      switchMap((documentModel) =>
        iif(
          () => documentModel !== null,
          of(documentModel),
          from(
            new this.socialMediaModel(
              this.socialMediaProvider.newSocialMedia(socialMedia)
            ).save()
          )
        )
      ),
      map(this.documentModelProvider.validateCreate),
      map(this.socialMediaProvider.fromDocumentModel)
    );
  }

  findAll$(): Observable<SocialMedia[]> {
    return from(
      this.socialMediaModel.find({ type: DocumentType.SocialMedia })
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.socialMediaProvider.fromDocumentModel),
      toArray<SocialMedia>()
    );
  }

  findOne$(id: string): Observable<SocialMedia> {
    return from(this.socialMediaModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.socialMediaProvider.fromDocumentModel)
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.socialMediaModel.findByIdAndDelete(id)).pipe(
      mapTo(undefined)
    );
  }
}
