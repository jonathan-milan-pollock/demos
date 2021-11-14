import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validatePublishEntity } from '../entities/entity-publish-validation.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { EntityProcessProvider } from './entity-process.provider';
import { ImagePublishProvider } from './image-publish.provider';
import { ImageVideoPublishProvider } from './image-video-publish.provider';
import { ImageVideoEmailProvider } from './image-video-email.provider';
import { SocialMediaPostProvider } from './social-media-post.provider';

@Injectable()
export class EntityPublishProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityProcessProvider: EntityProcessProvider,
    private readonly imagePublishProvider: ImagePublishProvider,
    private readonly imageVideoPublishProvider: ImageVideoPublishProvider,
    private readonly imageVideoEmailProvider: ImageVideoEmailProvider,
    private readonly socialMediaPostProvider: SocialMediaPostProvider
  ) {}

  publishEntity$(entityId: string, postSocialMedia: boolean): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map(validatePublishEntity),
      concatMap(() => this.entityProcessProvider.processEntity$(entityId)),
      concatMap(() => this.imagePublishProvider.publishImages$(entityId)),
      concatMap(() =>
        this.imageVideoPublishProvider.publishImageVideo$(entityId)
      ),
      concatMap(() => this.imageVideoEmailProvider.emailImageVideo$(entityId)),
      concatMap(() =>
        this.socialMediaPostProvider.postSocialMedia$(entityId, postSocialMedia)
      )
    );
  }
}
