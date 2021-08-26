import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { concatMap, from, mapTo, Observable, of, pluck } from 'rxjs';

import { DropboxUserTable } from '@dark-rush-photography/shared-server/data';
import { ConfigProvider } from './config.provider';

@Injectable()
export class DropboxUpdateProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectRepository(DropboxUserTable)
    private readonly userRepository: Repository<DropboxUserTable>
  ) {}

  update$(): Observable<void> {
    return from(from(this.userRepository.findAll())).pipe(
      pluck('entries'),
      concatMap((entries) => {
        const owner = entries.find(
          (entry: DropboxUserTable) =>
            entry.email === this.configProvider.dropboxEmail
        );
        if (owner && owner.refreshToken) {
          return of(undefined);
        }
        throw new NotFoundException('Dropbox refresh token was not found');
      }),
      mapTo(undefined)
    );
  }
}
