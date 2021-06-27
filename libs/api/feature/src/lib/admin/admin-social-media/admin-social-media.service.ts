import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, toArray } from 'rxjs/operators';

import { EntityType, SocialMedia } from '@dark-rush-photography/shared-types';
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

  create$(socialMediaCreate: SocialMediaCreateDto): Observable<SocialMedia> {
    return from(
      this.socialMediaModel.findOne({
        type: EntityType.SocialMedia,
        group: socialMediaCreate.group,
        slug: socialMediaCreate.slug,
      })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel) return of(documentModel);

        return from(
          new this.socialMediaModel(
            this.socialMediaProvider.newSocialMedia(socialMediaCreate)
          ).save()
        );
      }),
      map(this.documentModelProvider.validateCreate),
      map(this.socialMediaProvider.fromDocumentModel)
    );
  }

  findAll$(): Observable<SocialMedia[]> {
    return from(
      this.socialMediaModel.find({ type: EntityType.SocialMedia })
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
