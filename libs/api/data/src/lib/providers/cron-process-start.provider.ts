import { Injectable } from '@nestjs/common';

import {
  CronProcessType,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { CronProcessStartTypeProvider } from './cron-process-start-type.provider';
import { Observable } from 'rxjs';

@Injectable()
export class CronProcessStartProvider {
  constructor(
    private readonly cronProcessStartTypeProvider: CronProcessStartTypeProvider
  ) {}

  startDeleteEntity$(
    entityType: EntityType,
    entityId: string,
    group: string,
    slug: string
  ): Observable<void> {
    return this.cronProcessStartTypeProvider.startCronProcessType$(
      CronProcessType.DeleteEntity,
      entityType,
      entityId,
      group,
      slug
    );
  }

  startPublishEntity$(
    entityType: EntityType,
    entityId: string,
    group: string,
    slug: string,
    postSocialMedia: boolean
  ): Observable<void> {
    return this.cronProcessStartTypeProvider.startCronProcessType$(
      CronProcessType.PublishEntity,
      entityType,
      entityId,
      group,
      slug,
      postSocialMedia
    );
  }

  startUpdateNewImagesForEntity$(
    entityType: EntityType,
    entityId: string,
    group: string,
    slug: string
  ): Observable<void> {
    return this.cronProcessStartTypeProvider.startCronProcessType$(
      CronProcessType.UpdateNewImages,
      entityType,
      entityId,
      group,
      slug
    );
  }
}
