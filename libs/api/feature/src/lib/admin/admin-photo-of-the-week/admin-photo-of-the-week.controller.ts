import {
  Controller,
  Body,
  Param,
  Post,
  HttpCode,
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

import { PhotoOfTheWeek } from '@dark-rush-photography/shared/types';
import {
  PhotoOfTheWeekCreateDto,
  PhotoOfTheWeekDto,
  PhotoOfTheWeekUpdateDto,
} from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminPhotoOfTheWeekService } from './admin-photo-of-the-week.service';

@Controller('v1/admin/photo-of-the-week')
@ApiBearerAuth()
@ApiTags('Admin Photo of the Week')
export class AdminPhotoOfTheWeekController {
  constructor(
    private readonly adminPhotoOfTheWeekService: AdminPhotoOfTheWeekService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: PhotoOfTheWeekDto })
  create$(
    @Body() photoOfTheWeekCreate: PhotoOfTheWeekCreateDto
  ): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.create$(photoOfTheWeekCreate);
  }

  @Put(':id')
  @ApiOkResponse({ type: PhotoOfTheWeekDto })
  update$(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() photoOfTheWeekUpdate: PhotoOfTheWeekUpdateDto
  ): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.update$(id, photoOfTheWeekUpdate);
  }

  @Post(':id/post')
  @HttpCode(204)
  postProcess$(@Param('id', ParseObjectIdPipe) id: string): Observable<void> {
    return this.adminPhotoOfTheWeekService.post$(id);
  }

  @Get()
  @ApiOkResponse({ type: [PhotoOfTheWeekDto] })
  findAll$(): Observable<PhotoOfTheWeek[]> {
    return this.adminPhotoOfTheWeekService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: PhotoOfTheWeekDto })
  findOne$(
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.findOne$(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProcess$(@Param('id', ParseObjectIdPipe) id: string): Observable<void> {
    return this.adminPhotoOfTheWeekService.delete$(id);
  }
}
