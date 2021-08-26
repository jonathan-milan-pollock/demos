/* eslint-disable @typescript-eslint/no-var-requires */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { from, map, mergeMap, Observable, pluck } from 'rxjs';
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;

import { DropboxUserAccountResponse } from '@dark-rush-photography/api/types';
import { DropboxUserTable } from '@dark-rush-photography/shared-server/data';
import { ConfigProvider } from '../providers/config.provider';

@Injectable()
export class DropboxUserProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectRepository(DropboxUserTable)
    private readonly userRepository: Repository<DropboxUserTable>
  ) {}

  findEmail$(refreshToken: string): Observable<DropboxUserTable> {
    const dropbox = new Dropbox({
      fetch,
      clientId: this.configProvider.dropboxClientId,
      clientSecret: this.configProvider.dropboxClientSecret,
    });

    dropbox.auth.setRefreshToken(refreshToken);
    return from(dropbox.usersGetCurrentAccount()).pipe(
      map((response) => {
        const accountResponse = response as DropboxUserAccountResponse;
        if (accountResponse.status != 200)
          throw new BadRequestException(
            'Unable to find clients user account information from Dropbox'
          );
        const userTable = new DropboxUserTable();
        userTable.email = accountResponse.result.email;
        userTable.refreshToken = refreshToken;
        return userTable;
      })
    );
  }

  createOrUpdateUser$(
    userTable: DropboxUserTable
  ): Observable<DropboxUserTable> {
    return from(this.userRepository.findAll()).pipe(
      pluck('entries'),
      map((entries) =>
        entries.find((entryUser) => entryUser.email === userTable.email)
      ),
      mergeMap((foundUser) => {
        if (!foundUser) {
          return from(this.userRepository.create(userTable, userTable.email));
        } else {
          const updateUser = new DropboxUserTable();
          Object.assign(updateUser, {
            ...foundUser,
            refreshToken: userTable.refreshToken,
          });
          return from(this.userRepository.update(userTable.email, updateUser));
        }
      })
    );
  }
}
