import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  Post,
  Put,
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
  MediaProcess,
  MediaProcessAdminDto,
  MediaProcessCreateDto,
  MediaProcessType,
  MediaProcessUpdateDto,
} from '@dark-rush-photography/shared/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminMediaProcessesService } from './admin-media-processes.service';

@Controller({ path: 'admin/media-processes', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Media Processes')
export class AdminMediaProcessesController {
  constructor(
    private readonly adminMediaProcessesService: AdminMediaProcessesService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: MediaProcessAdminDto })
  create$(
    @Body() mediaProcessCreate: MediaProcessCreateDto
  ): Observable<MediaProcess> {
    return this.adminMediaProcessesService.create$(mediaProcessCreate);
  }

  @Put(':mediaProcessType/:id')
  @ApiOkResponse({ type: MediaProcessAdminDto })
  update$(
    @Param('mediaProcessType', new ParseEnumPipe(MediaProcessType))
    mediaProcessType: MediaProcessType,
    @Param('id') id: string,
    @Body() mediaProcessUpdate: MediaProcessUpdateDto
  ): Observable<MediaProcess> {
    return this.adminMediaProcessesService.update$(
      mediaProcessType,
      id,
      mediaProcessUpdate
    );
  }

  @Post(':mediaProcessType/:id/process')
  @HttpCode(204)
  process$(
    @Param('mediaProcessType', new ParseEnumPipe(MediaProcessType))
    mediaProcessType: MediaProcessType,
    @Param('id') id: string
  ): Observable<MediaProcess> {
    return this.adminMediaProcessesService.process$(mediaProcessType, id);
  }

  @Get(':mediaProcessType')
  @ApiParam({
    name: 'mediaProcessType',
    enum: MediaProcessType,
  })
  @ApiOkResponse({ type: [MediaProcessAdminDto] })
  findAll$(
    @Param('mediaProcessType', new ParseEnumPipe(MediaProcessType))
    mediaProcessType: MediaProcessType
  ): Observable<MediaProcess[]> {
    return this.adminMediaProcessesService.findAll$(mediaProcessType);
  }

  @Get(':mediaProcessType/:id')
  @ApiOkResponse({ type: MediaProcessAdminDto })
  findOne$(
    @Param('mediaProcessType', new ParseEnumPipe(MediaProcessType))
    mediaProcessType: MediaProcessType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<MediaProcess> {
    return this.adminMediaProcessesService.findOne$(mediaProcessType, id);
  }

  @Delete(':mediaProcessType/:id')
  @HttpCode(204)
  delete$(
    @Param('mediaProcessType', new ParseEnumPipe(MediaProcessType))
    mediaProcessType: MediaProcessType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<void> {
    return this.adminMediaProcessesService.delete$(mediaProcessType, id);
  }
}
