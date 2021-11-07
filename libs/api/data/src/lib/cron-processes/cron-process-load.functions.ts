import {
  CronProcess,
  CronProcessType,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { CronProcessTable } from '../tables/cron-process.table';

export const loadCronProcessUpdate = (
  cronProcessTable: CronProcessTable,
  cronProcessTableUpdate: Partial<CronProcessTable>
): CronProcessTable => {
  const newCronProcessTable = new CronProcessTable();
  Object.assign(newCronProcessTable, {
    ...cronProcessTable,
    ...cronProcessTableUpdate,
  });
  return newCronProcessTable;
};

export const loadCronProcess = (
  cronProcessTable: CronProcessTable
): CronProcess => {
  return {
    key: cronProcessTable.key,
    type: cronProcessTable.type as CronProcessType,
    entityType: cronProcessTable.entityType as EntityType,
    entityId: cronProcessTable.entityId,
    group: cronProcessTable.group,
    slug: cronProcessTable.slug,
    postSocialMedia: cronProcessTable.postSocialMedia,
    ready: cronProcessTable.ready,
    running: cronProcessTable.running,
    completed: cronProcessTable.completed,
    error: cronProcessTable.error,
  };
};
