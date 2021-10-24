import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { SocialMediaType } from '@dark-rush-photography/shared/types';
import {
  postSocialMediaImage$,
  postSocialMediaVideo$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validate-document-model.functions';
import { ConfigProvider } from './config.provider';
import {
  validateEntityImageVideo,
  validateEntityStarredImage,
} from '../entities/entity-field-validation.functions';

@Injectable()
export class SocialMediaPostPlatformProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  postPhotoOfTheWeek$(
    entityId: string,
    socialMediaType: SocialMediaType
  ): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityStarredImage(documentModel)),
      concatMap((starredImage) => {
        switch (socialMediaType) {
          case SocialMediaType.Facebook:
          case SocialMediaType.Instagram:
          case SocialMediaType.LinkedIn:
          case SocialMediaType.GoogleBusiness:
            return postSocialMediaImage$(
              socialMediaType,
              starredImage,
              'post',
              this.configProvider.ayrshareApiKey
            );
          default:
            throw new ConflictException(
              'Social media type is not valid for posting Photo of the Week'
            );
        }
      }),
      map(() => undefined)
    );
  }

  postEvent$(
    entityId: string,
    socialMediaType: SocialMediaType
  ): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map(
        (documentModel) => ({
          starredImage: validateEntityStarredImage(documentModel),
          video: validateEntityImageVideo(documentModel),
        }),
        concatMap(({ starredImage, video }) => {
          switch (socialMediaType) {
            case SocialMediaType.Facebook:
            case SocialMediaType.Instagram:
            case SocialMediaType.LinkedIn:
            case SocialMediaType.GoogleBusiness:
              return postSocialMediaVideo$(
                socialMediaType,
                starredImage,
                video,
                'title',
                'post',
                this.configProvider.ayrshareApiKey
              );
            default:
              throw new ConflictException(
                'Social media type is not valid for posting Photo of the Week'
              );
          }
        })
      ),
      map(() => undefined)
    );
  }
}
