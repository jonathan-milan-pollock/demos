import { Controller, Get, Param, ParseEnumPipe, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { EntityType } from '@dark-rush-photography/shared/types';
import { AdminGoogleDriveService } from './admin-google-drive.service';

@Controller({ path: 'admin/google-drive', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Google Drive')
export class AdminGoogleDriveController {
  constructor(
    private readonly adminGoogleDriveService: AdminGoogleDriveService
  ) {}

  @Post('sync/:entityType/:folderName')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  sync$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('folderName') folderName: string
  ): Observable<void> {
    return this.adminGoogleDriveService.sync$(entityType, folderName);
  }

  @Get(':entityType')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: [String] })
  findFolders$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType
  ): Observable<string[]> {
    return this.adminGoogleDriveService.findFolders$(entityType);
  }
}
