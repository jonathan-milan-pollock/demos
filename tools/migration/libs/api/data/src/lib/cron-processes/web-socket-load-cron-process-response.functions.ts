import {
  CronProcessType,
  WebSocketCronProcessResponse,
} from '@dark-rush-photography/shared/types';
import { CronProcessTable } from '../tables/cron-process.table';

export const loadWebSocketCronProcessResponse = (
  cronProcessTable: CronProcessTable
): WebSocketCronProcessResponse => {
  return {
    key: cronProcessTable.key,
    type: cronProcessTable.type as CronProcessType,
    entityId: cronProcessTable.entityId,
    ready: cronProcessTable.ready,
    running: cronProcessTable.running,
    completed: cronProcessTable.completed,
    error: cronProcessTable.error,
  };
};
