import { Controller, Delete, Get, HttpCode, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { CronProcessResponseDto } from '@dark-rush-photography/api/types';
import { AdminCronProcessesService } from '@dark-rush-photography/api/data';

@Controller({ path: 'admin/cron-processes', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Cron Processes')
export class AdminCronProcessesController {
  constructor(
    private readonly adminCronProcessesService: AdminCronProcessesService
  ) {}

  @Get()
  @ApiOkResponse({ type: [CronProcessResponseDto] })
  findAll$(): Observable<CronProcessResponseDto[]> {
    return this.adminCronProcessesService.findAll$();
  }

  @Get(':key')
  @ApiOkResponse({ type: CronProcessResponseDto })
  findOne$(@Param('key') key: string): Observable<CronProcessResponseDto> {
    return this.adminCronProcessesService.findOne$(key);
  }

  @Delete(':key')
  @HttpCode(204)
  delete$(@Param('key') key: string): Observable<void> {
    return this.adminCronProcessesService.delete$(key);
  }
}
