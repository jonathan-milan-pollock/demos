import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { SocialMediaType } from '@dark-rush-photography/shared/types';
import { postSocialMediaImage$ } from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validate-document-model.functions';
import { validateEntityStarredImage } from '../entities/entity-field-validation.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class SocialMediaPostProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  postSocialMedia$(
    entityId: string,
    postSocialMedia: boolean
  ): Observable<void> {
    if (!postSocialMedia) return of(undefined);

    const post = 'Weekend fun';
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const starredImage = validateEntityStarredImage(documentModel);
        return postSocialMediaImage$(
          SocialMediaType.Facebook,
          starredImage,
          post,
          this.configProvider.ayrshareApiKey
        );
      }),
      // map(validateEntityFound),
      //concatMap(() => from(Object.values(SocialMediaType))),
      //last(),
      map(() => undefined)
    );
  }
}
