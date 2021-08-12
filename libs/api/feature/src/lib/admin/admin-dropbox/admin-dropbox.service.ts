/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from 'express';
import { Injectable, Req } from '@nestjs/common';

import { mapTo, Observable } from 'rxjs';
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;

import {
  ClientsDropboxUpdateProvider,
  ConfigProvider,
  WebsitesDropboxUpdateProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminDropboxService {
  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly websitesDropboxUpdateProvider: WebsitesDropboxUpdateProvider,
    private readonly clientsDropboxUpdateProvider: ClientsDropboxUpdateProvider
  ) {}

  websitesRedirectUri(@Req() request: express.Request): string {
    const dropbox = new Dropbox({
      fetch,
      clientId: this.configProvider.websitesDropboxClientId,
      clientSecret: this.configProvider.websitesDropboxClientSecret,
    });

    return dropbox.auth
      .getAuthenticationUrl(
        this.configProvider.getWebsitesDropboxRedirectUri(
          request.protocol,
          request.headers.host
        ),
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

  clientsRedirectUri(@Req() request: express.Request): string {
    const dropbox = new Dropbox({
      fetch,
      clientId: this.configProvider.websitesDropboxClientId,
      clientSecret: this.configProvider.websitesDropboxClientSecret,
    });

    return dropbox.auth
      .getAuthenticationUrl(
        this.configProvider.getClientsDropboxRedirectUri(
          request.protocol,
          request.headers.host
        ),
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

  websitesUpdate$(): Observable<void> {
    return this.websitesDropboxUpdateProvider
      .addUpdate$()
      .pipe(mapTo(undefined));
  }

  clientsUpdate$(): Observable<void> {
    return this.clientsDropboxUpdateProvider
      .addUpdate$()
      .pipe(mapTo(undefined));
  }
}
