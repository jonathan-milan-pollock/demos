import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { v4 as uuidv4 } from 'uuid';
import { from, Observable } from 'rxjs';

import { ClientsDropboxUserTable } from '../tables/clients-dropbox-user.table';
import { ClientsDropboxUpdateTable } from '../tables/clients-dropbox-update.table';
import { ConfigProvider } from './config.provider';
import {
  isClientsDropboxUpdate,
  updateClientsDropbox,
} from '../dropbox/clients-dropbox-update.functions';

@Injectable()
export class ClientsDropboxUpdateProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectRepository(ClientsDropboxUserTable)
    private readonly userRepository: Repository<ClientsDropboxUserTable>,
    @InjectRepository(ClientsDropboxUpdateTable)
    private readonly updateRepository: Repository<ClientsDropboxUpdateTable>
  ) {
    this.logger = new Logger(ClientsDropboxUpdateProvider.name);
  }

  addUpdate$(): Observable<ClientsDropboxUpdateTable> {
    const key = uuidv4();
    const update = new ClientsDropboxUpdateTable();
    update.key = key;
    update.isUpdate = true;
    return from(this.updateRepository.create(update, key));
  }

  @Cron(CronExpression.EVERY_MINUTE, {
    timeZone: 'US/Eastern',
  })
  handleUpdates(): void {
    this.logger.log('Handling website updates');
    isClientsDropboxUpdate(this.updateRepository).then((isUpdate) => {
      if (!isUpdate) return;

      return updateClientsDropbox(
        this.userRepository,
        this.updateRepository,
        this.configProvider.websitesDropboxClientId,
        this.configProvider.websitesDropboxClientSecret,
        this.configProvider.dropboxOwnerEmail
      );
    });
  }
}
