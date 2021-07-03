import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  ADMIN,
  MediaProcess,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { MediaProcessDto } from '@dark-rush-photography/api/types';
import {
  MediaProcessTypeValidationPipe,
  Roles,
  RolesGuard,
} from '@dark-rush-photography/api/util';
import { AdminMediaProcessesService } from './admin-media-processes.service';

@Controller('admin/v1/media-processes')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Media Processes')
export class AdminMediaProcessesController {
  constructor(
    private readonly adminMediaProcessesService: AdminMediaProcessesService
  ) {}

  @Roles(ADMIN)
  @Post(':mediaProcessType/:slug')
  @ApiParam({
    name: 'mediaProcessType',
    enum: MediaProcessType,
  })
  @ApiCreatedResponse({ type: MediaProcessDto })
  create$(
    @Param('mediaProcessType', new MediaProcessTypeValidationPipe())
    mediaProcessType: MediaProcessType,
    @Param('slug') slug: string
  ): Observable<MediaProcess> {
    return this.adminMediaProcessesService.create$(mediaProcessType, slug);
  }

  @Roles(ADMIN)
  @Post(':mediaProcessType/:id/process')
  @HttpCode(204)
  process$(
    @Param('mediaProcessType', new MediaProcessTypeValidationPipe())
    mediaProcessType: MediaProcessType,
    @Param('id') id: string
  ): Observable<void> {
    return this.adminMediaProcessesService.process$(mediaProcessType, id);
  }

  @Roles(ADMIN)
  @Get(':mediaProcessType')
  @ApiParam({
    name: 'mediaProcessType',
    enum: MediaProcessType,
  })
  @ApiOkResponse({ type: [MediaProcessDto] })
  findAll$(
    @Param('mediaProcessType', new MediaProcessTypeValidationPipe())
    mediaProcessType: MediaProcessType
  ): Observable<MediaProcess[]> {
    return this.adminMediaProcessesService.findAll$(mediaProcessType);
  }

  @Roles(ADMIN)
  @Get(':mediaProcessType/:id')
  @ApiOkResponse({ type: MediaProcessDto })
  findOne$(
    @Param('mediaProcessType', new MediaProcessTypeValidationPipe())
    mediaProcessType: MediaProcessType,
    @Param('id') id: string
  ): Observable<MediaProcess> {
    return this.adminMediaProcessesService.findOne$(mediaProcessType, id);
  }

  @Roles(ADMIN)
  @Post(':mediaProcessType/:id/delete')
  @HttpCode(204)
  deleteProcess$(
    @Param('mediaProcessType', new MediaProcessTypeValidationPipe())
    mediaProcessType: MediaProcessType,
    @Param('id') id: string
  ): Observable<void> {
    return this.adminMediaProcessesService.deleteProcess$(mediaProcessType, id);
  }
}
