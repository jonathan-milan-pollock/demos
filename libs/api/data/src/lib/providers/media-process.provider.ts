import { Injectable, Logger } from '@nestjs/common';
import {
  InjectModel,
  InjectRepository,
  Repository,
} from '@nestjs/azure-database';
import { Cron, CronExpression } from '@nestjs/schedule';

import { catchError, concatMap, from, lastValueFrom, map, of } from 'rxjs';
import { Model } from 'mongoose';

import { MediaProcessType } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { MediaProcessTable } from '../tables/media-process.table';
import { WebSocketMessageProvider } from './web-socket-message.provider';

@Injectable()
export class MediaProcessProvider {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    @InjectRepository(MediaProcessTable)
    private readonly mediaProcessRepository: Repository<MediaProcessTable>,
    private readonly webSocketMessageProvider: WebSocketMessageProvider
  ) {
    this.logger = new Logger(MediaProcessProvider.name);
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM, {
    timeZone: 'US/Eastern',
  })
  removeTempFiles(): void {
    //TODO
    this.logger.log('remove temp files');
  }

  @Cron(CronExpression.EVERY_5_MINUTES, {
    timeZone: 'US/Eastern',
  })
  processMedia(): Promise<void> {
    return lastValueFrom(
      from(
        this.mediaProcessRepository.findAll(
          this.mediaProcessRepository.where(
            'ready == true'
            //entityPushNotification.channelId,
            //entityPushNotification.channelToken
          )
        )
      ).pipe(
        concatMap((response) => {
          if (response.entries.length === 0) {
            return of(undefined);
          }
          this.logger.log('number of entries', response.entries.length);

          const mediaProcess = response.entries[0];
          return from(this.entityModel.findById(mediaProcess.entityId)).pipe(
            concatMap((documentModel) => {
              if (!documentModel) {
                this.logger.error(`Entity not found ${mediaProcess.entityId}`);
                return of(undefined);
              }
              const mediaProcessType = mediaProcess.type as MediaProcessType;
              switch (mediaProcessType) {
                case MediaProcessType.Publish:
                  if (documentModel.isProcessing) return of(undefined);
                  return of(undefined);
                case MediaProcessType.PostSocialMedia:
                  if (documentModel.isProcessing || !documentModel.isPublished)
                    return of(undefined);
                  return of(undefined);
                case MediaProcessType.DeleteEntity:
                  if (documentModel.isProcessing) return of(undefined);
                  return of(undefined);
                case MediaProcessType.LoadNewImages:
                  return of(undefined);
                default:
                  return of(undefined);
              }
            }),
            catchError(() =>
              from(
                this.entityModel.findOneAndUpdate(
                  { id: mediaProcess.entityId },
                  {
                    isProcessing: false,
                  }
                )
              )
            ),
            map(() => this.webSocketMessageProvider.sendMessage(`adding image`))
          );
        }),
        map(() => undefined)
      )
    );
  }
}
