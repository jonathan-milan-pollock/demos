import { Injectable } from '@nestjs/common';

import { concatMap, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { CronProcessTable } from '../tables/cron-process.table';
import {
  getCronProcessCompleted,
  getCronProcessRunning,
} from '../cron-processes/cron-process-state.functions';
import { CronProcessStateUpdateProvider } from './cron-process-state-update.provider';
import { EntityDeleteProvider } from './entity-delete.provider';
import { EntityPublishProvider } from './entity-publish.provider';
import { ImageUpdateNewProvider } from './image-update-new.provider';

@Injectable()
export class CronProcessRunProvider {
  private runningCronProcess = false;

  constructor(
    private readonly cronProcessStateUpdateProvider: CronProcessStateUpdateProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider,
    private readonly entityPublishProvider: EntityPublishProvider,
    private readonly imageUpdateNewProvider: ImageUpdateNewProvider
  ) {}

  get isRunningCronProcess(): boolean {
    return this.runningCronProcess;
  }

  set isRunningCronProcess(runningCronProcess: boolean) {
    this.runningCronProcess = runningCronProcess;
  }

  deleteEntity$(cronProcessTable: CronProcessTable): Observable<void> {
    return this.cronProcessStateUpdateProvider
      .updateCronProcess$(cronProcessTable, getCronProcessRunning())
      .pipe(
        concatMap(() =>
          this.entityDeleteProvider.deleteEntity$(cronProcessTable.entityId)
        ),
        concatMap(() =>
          this.cronProcessStateUpdateProvider.updateCronProcess$(
            cronProcessTable,
            getCronProcessCompleted()
          )
        ),
        map(() => {
          this.isRunningCronProcess = false;
          return undefined;
        })
      );
  }

  publishEntity$(cronProcessTable: CronProcessTable): Observable<void> {
    return this.cronProcessStateUpdateProvider
      .updateCronProcess$(cronProcessTable, getCronProcessRunning())
      .pipe(
        concatMap(() =>
          this.entityPublishProvider.publishEntity$(
            cronProcessTable.entityId,
            cronProcessTable.postSocialMedia
          )
        ),
        concatMap(() =>
          this.cronProcessStateUpdateProvider.updateCronProcess$(
            cronProcessTable,
            getCronProcessCompleted()
          )
        ),
        map(() => {
          this.isRunningCronProcess = false;
          return undefined;
        })
      );
  }

  updateNewImages$(
    googleDrive: drive_v3.Drive,
    cronProcessTable: CronProcessTable
  ): Observable<void> {
    return this.cronProcessStateUpdateProvider
      .updateCronProcess$(cronProcessTable, getCronProcessRunning())
      .pipe(
        concatMap(() =>
          this.imageUpdateNewProvider.updateNewImages$(
            googleDrive,
            cronProcessTable.entityId
          )
        ),
        concatMap(() =>
          this.cronProcessStateUpdateProvider.updateCronProcess$(
            cronProcessTable,
            getCronProcessCompleted()
          )
        ),
        map(() => {
          this.isRunningCronProcess = false;
          return undefined;
        })
      );
  }
}
