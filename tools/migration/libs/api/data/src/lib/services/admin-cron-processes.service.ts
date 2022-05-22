import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { concatMap, map, Observable, of } from 'rxjs';

import { CronProcess } from '@dark-rush-photography/shared/types';
import { loadCronProcess } from '../cron-processes/cron-process-load.functions';
import { CronProcessRepositoryProvider } from '../providers/cron-process-repository.provider';

@Injectable()
export class AdminCronProcessesService {
  constructor(
    @Inject(CronProcessRepositoryProvider.name)
    private readonly cronProcessRepositoryProvider: CronProcessRepositoryProvider
  ) {}

  findAll$(): Observable<CronProcess[]> {
    return this.cronProcessRepositoryProvider
      .findAll$()
      .pipe(
        map((cronProcesses) =>
          cronProcesses.length == 0 ? [] : cronProcesses.map(loadCronProcess)
        )
      );
  }

  findOne$(rowKey: string): Observable<CronProcess> {
    return this.cronProcessRepositoryProvider.findAllForRowKey$(rowKey).pipe(
      map((entries) => {
        if (entries.length === 0) throw new NotFoundException();

        if (entries.length > 1) {
          throw new ConflictException(
            'More than one cron process found for row key'
          );
        }

        return loadCronProcess(entries[0]);
      })
    );
  }

  delete$(rowKey: string): Observable<void> {
    return this.cronProcessRepositoryProvider.findAllForRowKey$(rowKey).pipe(
      concatMap((entries) => {
        if (entries.length === 0) return of(undefined);

        return this.cronProcessRepositoryProvider.delete$(rowKey);
      })
    );
  }
}
