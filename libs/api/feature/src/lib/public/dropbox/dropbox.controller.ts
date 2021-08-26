import * as express from 'express';
import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { from, Observable } from 'rxjs';

import { Public } from '@dark-rush-photography/shared-server/util';
import { DropboxService } from './dropbox.service';

@Controller({ path: 'dropbox', version: '1' })
@Public()
@ApiTags('Public Dropbox')
export class DropboxController {
  constructor(private readonly dropboxService: DropboxService) {}

  @Get('redirect')
  redirect$(
    @Req() request: express.Request,
    @Query('code') code: string,
    @Query('status') status: string
  ): Observable<void> {
    return from(this.dropboxService.redirect$(request, code, status));
  }
}
