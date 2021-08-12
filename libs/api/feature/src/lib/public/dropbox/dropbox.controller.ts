import * as express from 'express';
import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { from, mapTo, Observable } from 'rxjs';

import { Public } from '@dark-rush-photography/shared-server/util';
import { DropboxService } from './dropbox.service';

@Controller({ path: 'dropbox', version: '1' })
@Public()
@ApiTags('Public Dropbox')
export class DropboxController {
  constructor(private readonly dropboxService: DropboxService) {}

  @Get('websites-redirect')
  websitesRedirect$(
    @Req() request: express.Request,
    @Query('code') code: string
  ): Observable<void> {
    return from(this.dropboxService.websitesRedirect$(request, code)).pipe(
      mapTo(undefined)
    );
  }

  @Get('clients-redirect')
  clientsRedirect$(
    @Req() request: express.Request,
    @Query('code') code: string
  ): Observable<void> {
    return from(this.dropboxService.clientsRedirect$(request, code)).pipe(
      mapTo(undefined)
    );
  }
}
