import { CronProcessTable } from '../tables/cron-process.table';

export const setCronProcessReady = (
  cronProcessTable: CronProcessTable
): void => {
  cronProcessTable.ready = true;
  cronProcessTable.running = false;
  cronProcessTable.completed = false;
  cronProcessTable.error = false;
};

export const getCronProcessRunning = (): Partial<CronProcessTable> => {
  return {
    ready: false,
    running: true,
    completed: false,
    error: false,
  };
};

export const getCronProcessCompleted = (): Partial<CronProcessTable> => {
  return {
    ready: false,
    running: false,
    completed: true,
    error: false,
  };
};

export const getCronProcessError = (): Partial<CronProcessTable> => {
  return {
    ready: false,
    running: false,
    completed: false,
    error: true,
  };
};
