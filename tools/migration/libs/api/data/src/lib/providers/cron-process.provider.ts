import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';

import { catchError, concatMap, lastValueFrom, of } from 'rxjs';
import { Model } from 'mongoose';

import { CronProcessType } from '@dark-rush-photography/shared/types';
import { getGoogleDrive } from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { getCronProcessError } from '../cron-processes/cron-process-state.functions';
import { ConfigProvider } from './config.provider';
import { CronProcessRepositoryProvider } from './cron-process-repository.provider';
import { CronProcessRunProvider } from './cron-process-run.provider';
import { CronProcessStateUpdateProvider } from './cron-process-state-update.provider';

@Injectable()
export class CronProcessProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    @Inject(CronProcessRepositoryProvider.name)
    private readonly cronProcessRepositoryProvider: CronProcessRepositoryProvider,
    private readonly cronProcessRunProvider: CronProcessRunProvider,
    private readonly cronProcessStateUpdateProvider: CronProcessStateUpdateProvider
  ) {
    this.logger = new Logger(ConfigProvider.name);
  }

  @Cron(CronExpression.EVERY_MINUTE, {
    timeZone: 'US/Eastern',
  })
  runCronProcesses(): Promise<void> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    if (this.cronProcessRunProvider.isRunningCronProcess) {
      return Promise.resolve(undefined);
    }

    return lastValueFrom(
      this.cronProcessRepositoryProvider.firstReady$().pipe(
        concatMap((cronProcessTable) => {
          if (!cronProcessTable) return of(undefined);

          return findEntityById$(
            cronProcessTable.entityId,
            this.entityModel
          ).pipe(
            concatMap((documentModel) => {
              if (!documentModel) {
                return this.cronProcessStateUpdateProvider.updateCronProcess$(
                  cronProcessTable,
                  getCronProcessError()
                );
              }

              switch (cronProcessTable.type) {
                case CronProcessType.DeleteEntity:
                  this.cronProcessRunProvider.isRunningCronProcess = true;
                  return this.cronProcessRunProvider.deleteEntity$(
                    cronProcessTable
                  );
                case CronProcessType.PublishEntity:
                  this.cronProcessRunProvider.isRunningCronProcess = true;
                  return this.cronProcessRunProvider.publishEntity$(
                    cronProcessTable
                  );
                case CronProcessType.UpdateNewImages:
                  this.cronProcessRunProvider.isRunningCronProcess = true;
                  return this.cronProcessRunProvider.updateNewImages$(
                    googleDrive,
                    cronProcessTable
                  );
                default:
                  return of(undefined);
              }
            }),
            catchError((error) => {
              this.logger.error(error);
              this.cronProcessRunProvider.isRunningCronProcess = false;
              return this.cronProcessStateUpdateProvider.updateCronProcess$(
                cronProcessTable,
                getCronProcessError()
              );
            })
          );
        })
      )
    );
  }
}
