import {
  Controller,
  Param,
  ParseEnumPipe,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { MediaProcessType } from '@dark-rush-photography/shared/types';
import {
  EntityAdminDto,
  MediaProcessCreateDto,
} from '@dark-rush-photography/api/types';
import { AdminAuthGuard, AdminRole } from '@dark-rush-photography/api/util';
import { AdminMediaProcessesService } from './admin-media-processes.service';

@Controller({ path: 'admin/media-processes', version: '1' })
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
@ApiTags('Admin Media Processes')
export class AdminMediaProcessesController {
  constructor(
    private readonly adminMediaProcessesService: AdminMediaProcessesService
  ) {}

  @AdminRole()
  @Post(':mediaProcessType')
  @ApiParam({
    name: 'mediaProcessType',
    enum: MediaProcessType,
  })
  @ApiCreatedResponse({ type: EntityAdminDto })
  create$(
    @Param('mediaProcessType', new ParseEnumPipe(MediaProcessType))
    mediaProcessType: MediaProcessType,
    @Body() mediaProcessCreate: MediaProcessCreateDto
  ): Observable<EntityAdminDto> {
    return this.adminMediaProcessesService.create$(
      mediaProcessType,
      mediaProcessCreate
    );
  }
}
