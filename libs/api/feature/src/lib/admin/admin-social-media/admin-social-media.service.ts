import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import {
  EntityType,
  SocialMedia,
  SocialMediaCreate,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminSocialMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly socialMediaModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  create$(socialMediaCreate: SocialMediaCreate): Observable<SocialMedia> {
    return this.entityProvider.create$(
      EntityType.SocialMedia,
      socialMediaCreate.group,
      socialMediaCreate.slug,
      this.socialMediaModel
    ) as Observable<SocialMedia>;
  }

  findAll$(): Observable<SocialMedia[]> {
    return this.entityProvider.findAll$(
      EntityType.SocialMedia,
      this.socialMediaModel
    ) as Observable<SocialMedia[]>;
  }

  findOne$(id: string): Observable<SocialMedia> {
    return this.entityProvider.findOne$(
      EntityType.SocialMedia,
      id,
      this.socialMediaModel
    ) as Observable<SocialMedia>;
  }

  delete$(id: string): Observable<void> {
    return this.entityProvider.delete$(
      EntityType.SocialMedia,
      id,
      this.socialMediaModel
    );
  }
}
