import { Injectable } from '@nestjs/common';

import {
  CronProcess,
  CronProcessResponse,
  CronProcessType,
  EntityType,
} from '@dark-rush-photography/shared/types';

@Injectable()
export class CronProcessResponseProvider {
  loadCronProcessResponse(cronProcess: CronProcess): CronProcessResponse {
    return {
      key: cronProcess.key,
      type: cronProcess.type as CronProcessType,
      entityType: cronProcess.entityType as EntityType,
      entityId: cronProcess.entityId,
      group: cronProcess.group,
      slug: cronProcess.slug,
      postSocialMedia: cronProcess.postSocialMedia,
      ready: cronProcess.ready,
      running: cronProcess.running,
      completed: cronProcess.completed,
      error: cronProcess.error,
    };
  }
}
