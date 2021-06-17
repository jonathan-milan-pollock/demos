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
import { SocialMediaDto } from '@dark-rush-photography/api/types';

@Injectable()
export class AdminSocialMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly socialMediaModel: Model<DocumentModel>,
    private readonly socialMediaProvider: SocialMediaProvider
  ) {}

  create$(slug: string): Observable<SocialMedia> {
    return from(
      this.socialMediaModel.findOne({
        type: DocumentType.SocialMedia,
        slug,
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
            slug,
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
            `Unable to create social media ${slug}`
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

  post$(socialMedia: SocialMediaDto): Observable<SocialMedia> {
    return of();
  }

  postMobileImage$(): Observable<SocialMedia> {
    return of();
  }
}
