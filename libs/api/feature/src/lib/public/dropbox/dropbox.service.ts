/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from 'express';
import { Injectable, NotFoundException, Req } from '@nestjs/common';

import { concatMap, from, map, mapTo, Observable } from 'rxjs';
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;

import { DropboxToken } from '@dark-rush-photography/api/types';
import {
  DropboxUserProvider,
  ConfigProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class DropboxService {
  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly dropboxUserProvider: DropboxUserProvider
  ) {}

  redirect$(
    @Req() request: express.Request,
    code: string,
    status: string
  ): Observable<void> {
    //TODO: Do something with status (should be unique data)
    const dropbox = new Dropbox({
      fetch,
      clientId: this.configProvider.dropboxClientId,
      clientSecret: this.configProvider.dropboxClientSecret,
    });

    return from(
      dropbox.auth.getAccessTokenFromCode(
        this.configProvider.getDropboxRedirectUri(
          request.protocol,
          request.headers.host
        ),
        code
      )
    ).pipe(
      map((token) => {
        const dropboxToken = token as DropboxToken;
        if (dropboxToken.status !== 200)
          throw new NotFoundException('Unable to find token');

        return dropboxToken.result.refresh_token;
      }),
      concatMap((refreshToken) =>
        this.dropboxUserProvider.findEmail$(refreshToken)
      ),
      concatMap((userTable) =>
        this.dropboxUserProvider.createOrUpdateUser$(userTable)
      ),
      mapTo(undefined)
    );
  }
}
