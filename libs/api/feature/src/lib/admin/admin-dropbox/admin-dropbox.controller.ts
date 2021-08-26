import * as express from 'express';
import { Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { AdminDropboxService } from './admin-dropbox.service';

@Controller({ path: 'admin/dropbox', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Dropbox')
export class AdminDropboxController {
  constructor(private readonly adminDropboxService: AdminDropboxService) {}

  @Get('have-refresh-token')
  haveRefreshToken(): Observable<boolean> {
    return this.adminDropboxService.haveRefreshToken$();
  }

  @Get('redirect-uri')
  redirectUri(@Req() request: express.Request): string {
    return this.adminDropboxService.redirectUri(request);
  }

  @Post('update')
  update$(): Observable<void> {
    return this.adminDropboxService.update$();
  }
}
