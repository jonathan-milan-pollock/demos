import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  Post,
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
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { MediaProcessDto } from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminMediaProcessesService } from './admin-media-processes.service';

@Controller('v1/admin/media-processes')
@ApiBearerAuth()
@ApiTags('Admin Media Processes')
export class AdminMediaProcessesController {
  constructor(
    private readonly adminMediaProcessesService: AdminMediaProcessesService
  ) {}

  @Post(':mediaProcessType/:slug')
  @ApiParam({
    name: 'mediaProcessType',
    enum: MediaProcessType,
  })
  @ApiCreatedResponse({ type: MediaProcessDto })
  create$(
    @Param('mediaProcessType', new ParseEnumPipe(MediaProcessType))
    mediaProcessType: MediaProcessType,
    @Param('slug') slug: string
  ): Observable<MediaProcess> {
    return this.adminMediaProcessesService.create$(mediaProcessType, slug);
  }

  @Post(':mediaProcessType/:id/process')
  @HttpCode(204)
  process$(
    @Param('mediaProcessType', new ParseEnumPipe(MediaProcessType))
    mediaProcessType: MediaProcessType,
    @Param('id') id: string
  ): Observable<void> {
    return this.adminMediaProcessesService.process$(mediaProcessType, id);
  }

  @Get(':mediaProcessType')
  @ApiParam({
    name: 'mediaProcessType',
    enum: MediaProcessType,
  })
  @ApiOkResponse({ type: [MediaProcessDto] })
  findAll$(
    @Param('mediaProcessType', new ParseEnumPipe(MediaProcessType))
    mediaProcessType: MediaProcessType
  ): Observable<MediaProcess[]> {
    return this.adminMediaProcessesService.findAll$(mediaProcessType);
  }

  @Get(':mediaProcessType/:id')
  @ApiOkResponse({ type: MediaProcessDto })
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
