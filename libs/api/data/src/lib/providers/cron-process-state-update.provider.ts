import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { concatMap, from, map, Observable } from 'rxjs';

import { CronProcess } from '@dark-rush-photography/shared/types';
import { CronProcessTable } from '../tables/cron-process.table';
import { WebSocketMessageProvider } from './web-socket-message.provider';

@Injectable()
export class CronProcessStateUpdateProvider {
  constructor(
    @InjectRepository(CronProcessTable)
    private readonly cronProcessRepository: Repository<CronProcessTable>,
    private readonly webSocketMessageProvider: WebSocketMessageProvider
  ) {}

  updateCronProcess$(
    cronProcess: CronProcess,
    cronProcessUpdate: Partial<CronProcess>
  ): Observable<void> {
    const update = { ...cronProcess, ...cronProcessUpdate };

    const cronProcessTable = new CronProcessTable();
    Object.assign(cronProcessTable, update);

    const jsonUpdate = JSON.stringify(update);

    return from(
      this.cronProcessRepository.update(cronProcess.key, cronProcessTable)
    ).pipe(
      concatMap(() =>
        from(this.webSocketMessageProvider.sendMessage(jsonUpdate))
      ),
      map(() => undefined)
    );
  }
}
