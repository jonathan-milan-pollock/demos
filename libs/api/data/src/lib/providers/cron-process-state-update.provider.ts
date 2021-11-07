import { Inject, Injectable } from '@nestjs/common';

import { concatMap, map, Observable } from 'rxjs';

import { CronProcessTable } from '../tables/cron-process.table';
import { loadCronProcessUpdate } from '../cron-processes/cron-process-load.functions';
import { loadWebSocketCronProcessResponse } from '../cron-processes/web-socket-load-cron-process-response.functions';
import { CronProcessRepositoryProvider } from './cron-process-repository.provider';
import { WebSocketMessageProvider } from './web-socket-message.provider';

@Injectable()
export class CronProcessStateUpdateProvider {
  constructor(
    @Inject(CronProcessRepositoryProvider.name)
    private readonly cronProcessRepositoryProvider: CronProcessRepositoryProvider,
    private readonly webSocketMessageProvider: WebSocketMessageProvider
  ) {}

  updateCronProcess$(
    cronProcessTable: CronProcessTable,
    cronProcessUpdate: Partial<CronProcessTable>
  ): Observable<void> {
    return this.cronProcessRepositoryProvider
      .update$(loadCronProcessUpdate(cronProcessTable, cronProcessUpdate))
      .pipe(
        concatMap(() =>
          this.webSocketMessageProvider.sendMessage$(
            JSON.stringify(
              loadWebSocketCronProcessResponse({
                ...cronProcessTable,
                ...cronProcessUpdate,
              })
            )
          )
        ),
        map(() => undefined)
      );
  }
}
