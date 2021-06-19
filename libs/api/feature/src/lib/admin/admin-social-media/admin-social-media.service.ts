import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { DocumentType, SocialMedia } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  SocialMediaProvider,
} from '@dark-rush-photography/api/data';
import { SocialMediaCreateDto } from '@dark-rush-photography/api/types';

@Injectable()
export class AdminSocialMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly socialMediaModel: Model<DocumentModel>,
    private readonly socialMediaProvider: SocialMediaProvider
  ) {}

  create$(socialMedia: SocialMediaCreateDto): Observable<SocialMedia> {
    return from(
      this.socialMediaModel.findOne({
        type: DocumentType.SocialMedia,
        group: socialMedia.group,
        slug: socialMedia.slug,
      })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel)
          throw new ConflictException(
            'Social media has already been created',
            HttpStatus.FOUND
          );

        return from(
          new this.socialMediaModel({
            type: DocumentType.SocialMedia,
            group: socialMedia.group,
            slug: socialMedia.slug,
            isPublic: true,
            images: [],
            imageDimensions: [],
            videos: [],
            videoDimensions: [],
          } as SocialMedia).save()
        );
      }),
      map((documentModel: DocumentModel) => {
        if (!documentModel) {
          throw new BadRequestException(
            `Unable to create social media ${socialMedia.group} ${socialMedia.slug}`
          );
        }
        return this.socialMediaProvider.fromDocumentModel(documentModel);
      })
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.socialMediaModel.findByIdAndDelete(id)).pipe(
      mapTo(undefined)
    );
  }
}
