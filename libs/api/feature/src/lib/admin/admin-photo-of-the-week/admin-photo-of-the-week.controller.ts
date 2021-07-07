import {
  Controller,
  Body,
  Param,
  Post,
  HttpCode,
  UseGuards,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, PhotoOfTheWeek } from '@dark-rush-photography/shared/types';
import {
  PhotoOfTheWeekCreateDto,
  PhotoOfTheWeekDto,
  PhotoOfTheWeekUpdateDto,
} from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminPhotoOfTheWeekService } from './admin-photo-of-the-week.service';

@Controller('admin/v1/photo-of-the-week')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Photo of the Week')
export class AdminPhotoOfTheWeekController {
  constructor(
    private readonly adminPhotoOfTheWeekService: AdminPhotoOfTheWeekService
  ) {}

  @Roles(ADMIN)
  @Post()
  @ApiCreatedResponse({ type: PhotoOfTheWeekDto })
  create$(
    @Body() photoOfTheWeekCreate: PhotoOfTheWeekCreateDto
  ): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.create$(photoOfTheWeekCreate);
  }

  @Roles(ADMIN)
  @Put(':id')
  @ApiOkResponse({ type: PhotoOfTheWeekDto })
  update$(
    @Param('id') id: string,
    @Body() photoOfTheWeekUpdate: PhotoOfTheWeekUpdateDto
  ): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.update$(id, photoOfTheWeekUpdate);
  }

  @Roles(ADMIN)
  @Post(':id/post')
  @HttpCode(204)
  postProcess$(@Param('id') id: string): Observable<void> {
    return this.adminPhotoOfTheWeekService.post$(id);
  }

  @Roles(ADMIN)
  @Get()
  @ApiOkResponse({ type: [PhotoOfTheWeekDto] })
  findAll$(): Observable<PhotoOfTheWeek[]> {
    return this.adminPhotoOfTheWeekService.findAll$();
  }

  @Roles(ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: PhotoOfTheWeekDto })
  findOne$(@Param('id') id: string): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.findOne$(id);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  deleteProcess$(@Param('id') id: string): Observable<void> {
    return this.adminPhotoOfTheWeekService.delete$(id);
  }
}
