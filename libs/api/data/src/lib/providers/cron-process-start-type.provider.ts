import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { v4 as uuidv4 } from 'uuid';
import { from, map, Observable } from 'rxjs';

import {
  CronProcessType,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { CronProcessTable } from '../tables/cron-process.table';
import { CronProcessStateProvider } from './cron-process-state.provider';

@Injectable()
export class CronProcessStartTypeProvider {
  constructor(
    @InjectRepository(CronProcessTable)
    private readonly cronProcessRepository: Repository<CronProcessTable>,
    private readonly cronProcessStateProvider: CronProcessStateProvider
  ) {}

  startCronProcessType$(
    cronProcessType: CronProcessType,
    entityType: EntityType,
    entityId: string,
    group: string,
    slug: string,
    postSocialMedia = false
  ): Observable<void> {
    const cronProcess = new CronProcessTable();
    cronProcess.key = uuidv4();
    cronProcess.type = cronProcessType;
    cronProcess.entityType = entityType;
    cronProcess.entityId = entityId;
    cronProcess.group = group;
    cronProcess.slug = slug;
    cronProcess.postSocialMedia = postSocialMedia;
    this.cronProcessStateProvider.setCronProcessReady(cronProcess);

    return from(
      this.cronProcessRepository.create(cronProcess, cronProcess.key)
    ).pipe(map(() => undefined));
  }
}
