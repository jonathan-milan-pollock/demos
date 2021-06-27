import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
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
} from '@dark-rush-photography/shared-types';
import { MediaProcessDto } from '@dark-rush-photography/api/types';
import {
  MediaProcessTypeValidationPipe,
  Roles,
  RolesGuard,
} from '@dark-rush-photography/api/util';
import { AdminMediaProcessService } from './admin-media-process.service';

@Controller('admin/v1/media-process')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Media Process')
export class AdminMediaProcessController {
  constructor(
    private readonly adminMediaProcessService: AdminMediaProcessService
  ) {}

  @Roles(ADMIN)
  @Post(':mediaProcessType')
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
    return this.adminMediaProcessService.create$(mediaProcessType, slug);
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
    return this.adminMediaProcessService.findAll$(mediaProcessType);
  }

  @Roles(ADMIN)
  @Get(':mediaProcessType/:id')
  @ApiOkResponse({ type: MediaProcessDto })
  findOne$(
    @Param('mediaProcessType', new MediaProcessTypeValidationPipe())
    mediaProcessType: MediaProcessType,
    @Param('id') id: string
  ): Observable<MediaProcess> {
    return this.adminMediaProcessService.findOne$(mediaProcessType, id);
  }

  @Roles(ADMIN)
  @Post(':mediaProcessType/:id/process')
  @ApiOkResponse({ type: MediaProcessDto })
  processAppleIcon$(
    @Param('mediaProcessType', new MediaProcessTypeValidationPipe())
    mediaProcessType: MediaProcessType,
    @Param('id') id: string
  ): Observable<MediaProcess> {
    return this.adminMediaProcessService.process$(mediaProcessType, id);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminMediaProcessService.delete$(id);
  }
}
