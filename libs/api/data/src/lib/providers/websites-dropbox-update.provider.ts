import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import {
  concatMap,
  concatMapTo,
  from,
  lastValueFrom,
  map,
  Observable,
  of,
  pluck,
  take,
} from 'rxjs';

import { DocumentModel, Document } from '../schema/document.schema';
import { WebsitesDropboxUserTable } from '../tables/websites-dropbox-user.table';
import { WebsitesDropboxUpdateTable } from '../tables/websites-dropbox-update.table';
import { ConfigProvider } from './config.provider';
import { WebsitesDropboxUpdateEntitiesProvider } from './websites-dropbox-update-entities.provider';

@Injectable()
export class WebsitesDropboxUpdateProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    @InjectRepository(WebsitesDropboxUserTable)
    private readonly userRepository: Repository<WebsitesDropboxUserTable>,
    @InjectRepository(WebsitesDropboxUpdateTable)
    private readonly updateRepository: Repository<WebsitesDropboxUpdateTable>,
    private readonly websitesDropboxUpdateEntitiesProvider: WebsitesDropboxUpdateEntitiesProvider
  ) {}

  addUpdate$(): Observable<WebsitesDropboxUpdateTable> {
    const key = uuidv4();
    const update = new WebsitesDropboxUpdateTable();
    update.key = key;
    update.isUpdate = true;
    return from(this.updateRepository.create(update, key));
  }

  @Cron(CronExpression.EVERY_MINUTE, {
    timeZone: 'US/Eastern',
  })
  async handleUpdates(): Promise<void> {
    await lastValueFrom(
      from(this.updateRepository.findAll()).pipe(
        map((response) => response.entries.length > 0),
        concatMap((isUpdate) => {
          if (!isUpdate) return of(undefined);
          return from(this.updateRepository.findAll()).pipe(
            pluck('entries'),
            concatMap((entries) => from(entries)),
            take(1),
            concatMap((entry) =>
              from(
                this.updateRepository.delete(
                  entry.key,
                  new WebsitesDropboxUpdateTable()
                )
              )
            ),
            concatMapTo(from(this.userRepository.findAll())),
            pluck('entries'),
            concatMap((entries) => {
              const owner = entries.find(
                (entry: WebsitesDropboxUserTable) =>
                  entry.email === this.configProvider.dropboxOwnerEmail
              );
              if (owner && owner.refreshToken) {
                return this.websitesDropboxUpdateEntitiesProvider.update$(
                  owner.refreshToken
                );
              }
              throw new UnauthorizedException();
            })
          );
        })
      )
    );
  }
}
