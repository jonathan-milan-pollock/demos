import { CronProcessTable } from '../tables/cron-process.table';
import {
  getCronProcessCompleted,
  getCronProcessError,
  getCronProcessRunning,
  setCronProcessReady,
} from './cron-process-state.functions';

describe('cron-process-state.functions', () => {
  describe('setCronProcessReady', () => {
    it('should load a ready cron process', () => {
      const cronProcessTable = new CronProcessTable();
      setCronProcessReady(cronProcessTable);

      expect(cronProcessTable.ready).toBe(true);
      expect(cronProcessTable.running).toBe(false);
      expect(cronProcessTable.completed).toBe(false);
      expect(cronProcessTable.error).toBe(false);
    });
  });

  describe('getCronProcessRunning', () => {
    it('should get a running cron process', () => {
      const runningCronProcess = getCronProcessRunning();

      expect(runningCronProcess.ready).toBe(false);
      expect(runningCronProcess.running).toBe(true);
      expect(runningCronProcess.completed).toBe(false);
      expect(runningCronProcess.error).toBe(false);
    });
  });

  describe('getCronProcessCompleted', () => {
    it('should get a completed cron process', () => {
      const completedCronProcess = getCronProcessCompleted();

      expect(completedCronProcess.ready).toBe(false);
      expect(completedCronProcess.running).toBe(false);
      expect(completedCronProcess.completed).toBe(true);
      expect(completedCronProcess.error).toBe(false);
    });
  });

  describe('getCronProcessError', () => {
    it('should get a error cron process', () => {
      const errorCronProcess = getCronProcessError();

      expect(errorCronProcess.ready).toBe(false);
      expect(errorCronProcess.running).toBe(false);
      expect(errorCronProcess.completed).toBe(false);
      expect(errorCronProcess.error).toBe(true);
    });
  });
});
