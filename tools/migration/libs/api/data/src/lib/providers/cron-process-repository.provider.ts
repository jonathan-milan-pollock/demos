/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { from, map, Observable } from 'rxjs';

import { CronProcess } from '@dark-rush-photography/shared/types';
import { CronProcessTable } from '../tables/cron-process.table';
import { loadCronProcess } from '../cron-processes/cron-process-load.functions';

@Injectable()
export class CronProcessRepositoryProvider {
  constructor(
    @InjectRepository(CronProcessTable)
    private readonly cronProcessRepository: Repository<CronProcessTable>
  ) {}

  create$(cronProcessTable: CronProcessTable): Observable<void> {
    return from(
      this.cronProcessRepository.create(cronProcessTable, cronProcessTable.key)
    ).pipe(map(() => undefined));
  }

  update$(cronProcessTable: CronProcessTable): Observable<void> {
    return from(
      this.cronProcessRepository.update(cronProcessTable.key, cronProcessTable)
    ).pipe(map(() => undefined));
  }

  findAll$(): Observable<CronProcess[]> {
    return from(this.cronProcessRepository.findAll()).pipe(
      map((response) => response.entries.map(loadCronProcess))
    );
  }

  findAllForRowKey$(rowKey: string): Observable<CronProcessTable[]> {
    return from(
      this.cronProcessRepository.findAll(
        this.cronProcessRepository.where(`RowKey == '${rowKey}'`)
      )
    ).pipe(map((response) => response.entries.map(loadCronProcess)));
  }

  firstReady$(): Observable<CronProcessTable | undefined> {
    return from(
      this.cronProcessRepository.findAll(
        this.cronProcessRepository.where('ready == true')
      )
    ).pipe(
      map((response) =>
        response.entries.length === 0 ? undefined : response.entries[0]
      )
    );
  }

  delete$(rowKey: string): Observable<void> {
    return from(
      this.cronProcessRepository.delete(rowKey, new CronProcessTable())
    ).pipe(map(() => undefined));
  }
}
