/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from 'express';
import { BadRequestException, Injectable, Req } from '@nestjs/common';

import { concatMap, from, map, mapTo, Observable } from 'rxjs';
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;

import { DropboxToken } from '@dark-rush-photography/api/types';
import {
  ClientsDropboxUserProvider,
  ConfigProvider,
  WebsitesDropboxUserProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class DropboxService {
  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly websitesDropboxUserProvider: WebsitesDropboxUserProvider,
    private readonly clientsDropboxUserProvider: ClientsDropboxUserProvider,
  ) {}

  websitesRedirect$(
    @Req() request: express.Request,
    code: string
  ): Observable<void> {
    const dropbox = new Dropbox({
      fetch,
      clientId: this.configProvider.websitesDropboxClientId,
      clientSecret: this.configProvider.websitesDropboxClientSecret,
    });

    return from(
      dropbox.auth.getAccessTokenFromCode(
        this.configProvider.getWebsitesDropboxRedirectUri(
          request.protocol,
          request.headers.host
        ),
        code
      )
    ).pipe(
      map((token) => {
        const dropboxToken = token as DropboxToken;
        if (dropboxToken.status !== 200)
          throw new BadRequestException('Unable to find token');

        return dropboxToken.result.refresh_token;
      }),
      concatMap((refreshToken) =>
        this.websitesDropboxUserProvider.findEmail$(refreshToken)
      ),
      concatMap((user) =>
        this.websitesDropboxUserProvider.createOrUpdateUser$(user)
      ),
      mapTo(undefined)
    );
  }

  clientsRedirect$(
    @Req() request: express.Request,
    code: string
  ): Observable<void> {
    const dropbox = new Dropbox({
      fetch,
      clientId: this.configProvider.clientsDropboxClientId,
      clientSecret: this.configProvider.clientsDropboxClientSecret,
    });

    return from(
      dropbox.auth.getAccessTokenFromCode(
        this.configProvider.getWebsitesDropboxRedirectUri(
          request.protocol,
          request.headers.host
        ),
        code
      )
    ).pipe(
      map((token) => {
        const dropboxToken = token as DropboxToken;
        if (dropboxToken.status !== 200)
          throw new BadRequestException('Unable to find token');

        return dropboxToken.result.refresh_token;
      }),
      concatMap((refreshToken) =>
        this.clientsDropboxUserProvider.findEmail$(refreshToken)
      ),
      concatMap((user) =>
        this.clientsDropboxUserProvider.createOrUpdateUser$(user)
      ),
      mapTo(undefined)
    );
  }
}
