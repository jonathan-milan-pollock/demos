import { CronProcessType } from '../enums/cron-process-type.enum';
import { EntityType } from '../enums/entity-type.enum';

export interface CronProcess {
  readonly key: string;
  readonly type: CronProcessType;
  readonly entityType: EntityType;
  readonly entityId: string;
  readonly group: string;
  readonly pathname: string;
  readonly postSocialMedia: boolean;
  readonly ready: boolean;
  readonly running: boolean;
  readonly completed: boolean;
  readonly error: boolean;
}
