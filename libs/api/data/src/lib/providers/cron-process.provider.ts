import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository, Repository } from '@nestjs/azure-database';
import { Cron, CronExpression } from '@nestjs/schedule';

import { catchError, concatMap, from, lastValueFrom, of } from 'rxjs';
import { Model } from 'mongoose';

import { CronProcessType } from '@dark-rush-photography/shared/types';
import { getGoogleDrive } from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { CronProcessTable } from '../tables/cron-process.table';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { ConfigProvider } from './config.provider';
import { CronProcessStateProvider } from './cron-process-state.provider';
import { ImageUpdateNewProvider } from './image-update-new.provider';
import { EntityPublishProvider } from './entity-publish.provider';
import { EntityDeleteProvider } from './entity-delete.provider';
import { ImageRemoveAllProvider } from './image-remove-all.provider';

@Injectable()
export class CronProcessProvider {
  private isRunningCronProcess = false;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    @InjectRepository(CronProcessTable)
    private readonly cronProcessRepository: Repository<CronProcessTable>,
    private readonly cronProcessStateProvider: CronProcessStateProvider,
    private readonly imageUpdateNewProvider: ImageUpdateNewProvider,
    private readonly entityPublishProvider: EntityPublishProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider,
    private readonly imageRemoveAllProvider: ImageRemoveAllProvider
  ) {}

  @Cron(CronExpression.EVERY_MINUTE, {
    timeZone: 'US/Eastern',
  })
  runCronProcesses(): Promise<void> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    if (this.isRunningCronProcess) {
      return Promise.resolve(undefined);
    }

    return lastValueFrom(
      from(
        this.cronProcessRepository.findAll(
          this.cronProcessRepository.where('ready == true')
        )
      ).pipe(
        concatMap((response) => {
          if (response.entries.length === 0) {
            return of(undefined);
          }

          const cronProcess = response.entries[0];
          return findEntityById$(cronProcess.entityId, this.entityModel).pipe(
            concatMap((documentModel) => {
              if (!documentModel) {
                return this.cronProcessStateProvider.updateCronProcessError$(
                  cronProcess
                );
              }

              this.isRunningCronProcess = true;
              const cronProcessType = cronProcess.type as CronProcessType;
              switch (cronProcessType) {
                case CronProcessType.DeleteEntity:
                  return this.cronProcessStateProvider
                    .updateCronProcessRunning$(cronProcess)
                    .pipe(
                      concatMap(() =>
                        this.entityDeleteProvider.deleteEntity$(
                          cronProcess.entityId
                        )
                      ),
                      concatMap(() => {
                        this.isRunningCronProcess = false;
                        return this.cronProcessStateProvider.updateCronProcessCompleted$(
                          cronProcess
                        );
                      })
                    );
                case CronProcessType.PublishEntity:
                  return this.cronProcessStateProvider
                    .updateCronProcessRunning$(cronProcess)
                    .pipe(
                      concatMap(() =>
                        this.entityPublishProvider.publishEntity$(
                          cronProcess.entityId,
                          cronProcess.postSocialMedia
                        )
                      ),
                      concatMap(() => {
                        this.isRunningCronProcess = false;
                        return this.cronProcessStateProvider.updateCronProcessCompleted$(
                          cronProcess
                        );
                      })
                    );
                case CronProcessType.UpdateNewImages:
                  return this.cronProcessStateProvider
                    .updateCronProcessRunning$(cronProcess)
                    .pipe(
                      concatMap(() =>
                        this.imageRemoveAllProvider.removeAllNewImages$(
                          cronProcess.entityId
                        )
                      ),
                      concatMap(() =>
                        this.imageUpdateNewProvider.updateNewImages$(
                          googleDrive,
                          cronProcess.entityId
                        )
                      ),
                      concatMap(() => {
                        this.isRunningCronProcess = false;
                        return this.cronProcessStateProvider.updateCronProcessCompleted$(
                          cronProcess
                        );
                      })
                    );
                default:
                  return of(undefined);
              }
            }),
            catchError(() => {
              this.isRunningCronProcess = false;
              return this.cronProcessStateProvider.updateCronProcessError$(
                cronProcess
              );
            })
          );
        })
      )
    );
  }
}
