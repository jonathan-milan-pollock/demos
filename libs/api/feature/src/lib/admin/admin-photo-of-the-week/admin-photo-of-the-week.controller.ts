import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
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
    @Body() photoOfTheWeek: PhotoOfTheWeekCreateDto
  ): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.create$(photoOfTheWeek);
  }

  @Roles(ADMIN)
  @Put(':id')
  update$(
    @Param('id') id: string,
    @Body() photoOfTheWeek: PhotoOfTheWeekUpdateDto
  ): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.update$(id, photoOfTheWeek);
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
  @Post(':id/post')
  post$(@Param('id') id: string): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.post$(id);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminPhotoOfTheWeekService.delete$(id);
  }
}
