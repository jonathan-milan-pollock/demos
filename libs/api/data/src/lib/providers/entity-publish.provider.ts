import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { validatePublishEntity } from '../entities/entity-publish-validation.functions';
import { ImageProcessAllProvider } from './image-process-all.provider';
import { ImageProcessOneProvider } from './image-process-one.provider';
import { ImagePublishProvider } from './image-publish.provider';
import { SocialMediaPostProvider } from './social-media-post.provider';
import { ImageVideoEmailProvider } from './image-video-email.provider';

@Injectable()
export class EntityPublishProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProcessAllProvider: ImageProcessAllProvider,
    private readonly imageProcessOneProvider: ImageProcessOneProvider,
    private readonly imagePublishProvider: ImagePublishProvider,
    private readonly imageVideoEmailProvider: ImageVideoEmailProvider,
    private readonly socialMediaPostProvider: SocialMediaPostProvider
  ) {}

  publishEntity$(entityId: string, postSocialMedia: boolean): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map(validatePublishEntity),
      concatMap(() => this.imageProcessAllProvider.processAllImages$(entityId)),
      concatMap(() =>
        this.imageProcessOneProvider.processImageVideo$(entityId)
      ),
      concatMap(() => this.imagePublishProvider.publishImages$(entityId)),
      concatMap(() => this.imagePublishProvider.publishImageVideo$(entityId)),
      concatMap(() =>
        this.socialMediaPostProvider.postSocialMedia$(entityId, postSocialMedia)
      ),
      concatMap(() => this.imageVideoEmailProvider.sendEmail$(entityId)),
      map(() => undefined)
    );
  }
}
