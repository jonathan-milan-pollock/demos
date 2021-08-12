import * as express from 'express';
import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { Observable, of } from 'rxjs';

import { EntityType } from '@dark-rush-photography/shared/types';
import { AdminDropboxService } from './admin-dropbox.service';

@Controller({ path: 'admin/dropbox', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Dropbox')
export class AdminDropboxController {
  constructor(private readonly adminDropboxService: AdminDropboxService) {}

  @Get('websites-refresh-token')
  websitesRefreshToken(): Observable<boolean> {
    return of(false); // TODO: Determine if has refresh token
  }

  @Get('clients-refresh-token')
  clientsRefreshToken(): Observable<boolean> {
    return of(false); // TODO: Determine if has refresh token
  }

  @Get('websites-redirect-uri')
  websitesRedirectUri(@Req() request: express.Request): string {
    return this.adminDropboxService.websitesRedirectUri(request);
  }

  @Get('clients-redirect-uri')
  clientsRedirectUri(@Req() request: express.Request): string {
    return this.adminDropboxService.clientsRedirectUri(request);
  }

  //TODO: Need to a an optional slug and group, so a DTO
  @Post('websites-update/:entityType')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  websitesUpdate$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType
  ): Observable<void> {
    return this.adminDropboxService.websitesUpdate$();
  }

  @Post('clients-update')
  clientsUpdate$(): Observable<void> {
    return this.adminDropboxService.clientsUpdate$();
  }
}
