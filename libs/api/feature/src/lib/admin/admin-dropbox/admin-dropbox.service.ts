/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from 'express';
import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { concatMap, from, map, mapTo, Observable, of, pluck } from 'rxjs';
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;

import {
  DropboxUpdateProvider,
  ConfigProvider,
} from '@dark-rush-photography/api/data';
import { DropboxUserTable } from '@dark-rush-photography/shared-server/data';

@Injectable()
export class AdminDropboxService {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectRepository(DropboxUserTable)
    private readonly userRepository: Repository<DropboxUserTable>,
    private readonly dropboxUpdateProvider: DropboxUpdateProvider
  ) {}

  haveRefreshToken$(): Observable<boolean> {
    return from(this.userRepository.findAll()).pipe(
      pluck('entries'),
      map((entries) => {
        const userTable = entries.find(
          (entry: DropboxUserTable) =>
            entry.email === this.configProvider.dropboxEmail
        );
        return !!userTable && !!userTable.refreshToken;
      })
    );
  }

  redirectUri(@Req() request: express.Request): string {
    const dropbox = new Dropbox({
      fetch,
      clientId: this.configProvider.dropboxClientId,
      clientSecret: this.configProvider.dropboxClientSecret,
    });

    const redirectUri = this.configProvider.getDropboxRedirectUri(
      request.protocol,
      request.headers.host
    );

    return dropbox.auth
      .getAuthenticationUrl(
        redirectUri,
        null,
        'code',
        'offline',
        null,
        'none',
        false
      )
      .then((authenticationUrl: string) => {
        return authenticationUrl;
      });
  }

  update$(): Observable<void> {
    return from(this.userRepository.findAll()).pipe(
      pluck('entries'),
      concatMap((entries) => {
        const userTable = entries.find(
          (entry: DropboxUserTable) =>
            entry.email === this.configProvider.dropboxEmail
        );
        if (userTable && userTable.refreshToken) {
          return of(undefined);
        }
        throw new NotFoundException('Dropbox refresh token was not found');
      }),
      mapTo(undefined)
    );
  }
}
