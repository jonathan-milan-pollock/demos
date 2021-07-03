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
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminSocialMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly socialMediaModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly serverlessEntityProvider: ServerlessEntityProvider
  ) {}

  create$(socialMediaCreate: SocialMediaCreate): Observable<SocialMedia> {
    return this.entityProvider.create$(
      EntityType.SocialMedia,
      socialMediaCreate.slug,
      this.socialMediaModel,
      socialMediaCreate.group
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

  deleteProcess$(id: string): Observable<void> {
    return this.serverlessEntityProvider.deleteProcess$(
      EntityType.SocialMedia,
      id,
      this.socialMediaModel
    );
  }
}
