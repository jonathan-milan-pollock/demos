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
import { validateEntityFound } from '../entities/entity-validation.functions';
import { validatePublishStarredImage } from '../images/image-field-validation.functions';
import { validateImageVideo } from '../images/image-validation.functions';
import { ConfigProvider } from './config.provider';

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
      map((documentModel) => validatePublishStarredImage(documentModel.images)),
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
          starredImage: validatePublishStarredImage(documentModel.images),
          video: validateImageVideo(documentModel.imageVideo),
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
