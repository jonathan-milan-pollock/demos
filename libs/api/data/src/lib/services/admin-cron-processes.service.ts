import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { concatMap, from, map, Observable, of, toArray } from 'rxjs';

import { CronProcessResponse } from '@dark-rush-photography/shared/types';
import { CronProcessTable } from '../tables/cron-process.table';
import { CronProcessResponseProvider } from '../providers/cron-process-response.provider';

@Injectable()
export class AdminCronProcessesService {
  constructor(
    @InjectRepository(CronProcessTable)
    private readonly cronProcessRepository: Repository<CronProcessTable>,
    private readonly cronProcessResponseProvider: CronProcessResponseProvider
  ) {}

  findAll$(): Observable<CronProcessResponse[]> {
    return from(this.cronProcessRepository.findAll()).pipe(
      concatMap((response) => {
        if (response.entries.length == 0) {
          return of([]);
        }

        return from(response.entries).pipe(
          map(this.cronProcessResponseProvider.loadCronProcessResponse),
          toArray<CronProcessResponse>()
        );
      })
    );
  }

  findOne$(key: string): Observable<CronProcessResponse> {
    return from(
      this.cronProcessRepository.findAll(
        this.cronProcessRepository.where(`RowKey == '${key}'`)
      )
    ).pipe(
      map((response) => {
        if (response.entries.length === 0) throw new NotFoundException();

        return this.cronProcessResponseProvider.loadCronProcessResponse(
          response.entries[0]
        );
      })
    );
  }

  delete$(key: string): Observable<void> {
    return from(
      this.cronProcessRepository.findAll(
        this.cronProcessRepository.where(`RowKey == '${key}'`)
      )
    ).pipe(
      concatMap((response) => {
        if (response.entries.length === 0) return of(undefined);

        return from(
          this.cronProcessRepository.delete(key, new CronProcessTable())
        );
      }),
      map(() => undefined)
    );
  }
}
