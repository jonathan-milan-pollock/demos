import { Injectable, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';

import { CronProcess } from '@dark-rush-photography/shared/types';
import { CronProcessTable } from '../tables/cron-process.table';
import { CronProcessStateUpdateProvider } from './cron-process-state-update.provider';

@Injectable()
export class CronProcessStateProvider {
  private readonly logger: Logger;
  constructor(
    private readonly cronProcessStateUpdateProvider: CronProcessStateUpdateProvider
  ) {
    this.logger = new Logger(CronProcessStateProvider.name);
  }

  setCronProcessReady(cronProcess: CronProcessTable): void {
    cronProcess.ready = true;
    cronProcess.running = false;
    cronProcess.completed = false;
    cronProcess.error = false;
  }

  updateCronProcessRunning$(cronProcess: CronProcess): Observable<void> {
    return this.cronProcessStateUpdateProvider.updateCronProcess$(cronProcess, {
      ready: false,
      running: true,
      completed: false,
      error: false,
    });
  }

  updateCronProcessCompleted$(cronProcess: CronProcess): Observable<void> {
    return this.cronProcessStateUpdateProvider.updateCronProcess$(cronProcess, {
      ready: false,
      running: false,
      completed: true,
      error: false,
    });
  }

  updateCronProcessError$(cronProcess: CronProcess): Observable<void> {
    return this.cronProcessStateUpdateProvider.updateCronProcess$(cronProcess, {
      ready: false,
      running: false,
      completed: false,
      error: true,
    });
  }
}
