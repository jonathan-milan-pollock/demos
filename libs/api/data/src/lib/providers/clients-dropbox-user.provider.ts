/* eslint-disable @typescript-eslint/no-var-requires */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { from, map, mergeMap, Observable, pluck } from 'rxjs';
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;

import { ClientsDropboxUserTable } from '../tables/clients-dropbox-user.table';
import { ConfigProvider } from '../providers/config.provider';
import { DropboxUserAccountResponse } from '@dark-rush-photography/api/types';

@Injectable()
export class ClientsDropboxUserProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectRepository(ClientsDropboxUserTable)
    private readonly userRepository: Repository<ClientsDropboxUserTable>
  ) {}

  findEmail$(refreshToken: string): Observable<ClientsDropboxUserTable> {
    const dropbox = new Dropbox({
      fetch,
      clientId: this.configProvider.clientsDropboxClientId,
      clientSecret: this.configProvider.clientsDropboxClientSecret,
    });

    dropbox.auth.setRefreshToken(refreshToken);
    return from(dropbox.usersGetCurrentAccount()).pipe(
      map((response) => {
        const accountResponse = response as DropboxUserAccountResponse;
        if (accountResponse.status != 200)
          throw new BadRequestException(
            'Unable to find clients user account information from Dropbox'
          );
        const user = new ClientsDropboxUserTable();
        user.email = accountResponse.result.email;
        user.refreshToken = refreshToken;
        return user;
      })
    );
  }

  createOrUpdateUser$(
    user: ClientsDropboxUserTable
  ): Observable<ClientsDropboxUserTable> {
    return from(this.userRepository.findAll()).pipe(
      pluck('entries'),
      map((entries) =>
        entries.find((entryUser) => entryUser.email === user.email)
      ),
      mergeMap((foundUser) => {
        if (!foundUser) {
          return from(this.userRepository.create(user, user.email));
        } else {
          const updateUser = new ClientsDropboxUserTable();
          Object.assign(updateUser, {
            ...foundUser,
            refreshToken: user.refreshToken,
          });
          return from(this.userRepository.update(user.email, updateUser));
        }
      })
    );
  }
}
