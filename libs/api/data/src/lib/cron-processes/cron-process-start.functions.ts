import { v4 as uuidv4 } from 'uuid';

import {
  CronProcessType,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { CronProcessTable } from '../tables/cron-process.table';
import { setCronProcessReady } from './cron-process-state.functions';

export const startCronProcessType = (
  type: CronProcessType,
  entityType: EntityType,
  entityId: string,
  group: string,
  pathname: string,
  postSocialMedia = false
): CronProcessTable => {
  const cronProcessTable = new CronProcessTable();
  cronProcessTable.key = uuidv4();
  cronProcessTable.type = type;
  cronProcessTable.entityType = entityType;
  cronProcessTable.entityId = entityId;
  cronProcessTable.group = group;
  cronProcessTable.pathname = pathname;
  cronProcessTable.postSocialMedia = postSocialMedia;
  setCronProcessReady(cronProcessTable);
  return cronProcessTable;
};
