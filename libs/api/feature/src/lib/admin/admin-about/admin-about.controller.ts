import {
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
  Get,
  Delete,
  Body,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  About,
  AboutAdminDto,
  AboutCreateDto,
  AboutUpdateDto,
} from '@dark-rush-photography/shared/types';
import {
  ParseObjectIdPipe,
  User,
  UserGuard,
} from '@dark-rush-photography/api/util';
import { AdminAboutService } from './admin-about.service';

@Controller({ path: 'admin/about', version: '1' })
@UseGuards(UserGuard)
@User()
@ApiBearerAuth()
@ApiTags('Admin About')
export class AdminAboutController {
  constructor(private readonly adminAboutService: AdminAboutService) {}

  @Post()
  @ApiCreatedResponse({ type: AboutAdminDto })
  create$(@Body() aboutCreate: AboutCreateDto): Observable<About> {
    return this.adminAboutService.create$(aboutCreate);
  }

  @Put(':id')
  @ApiOkResponse({ type: AboutAdminDto })
  update$(
    @Param('id') id: string,
    @Body() aboutUpdate: AboutUpdateDto
  ): Observable<About> {
    return this.adminAboutService.update$(id, aboutUpdate);
  }

  @Get()
  @ApiOkResponse({ type: [AboutAdminDto] })
  findAll$(): Observable<About[]> {
    return this.adminAboutService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: AboutAdminDto })
  findOne$(@Param('id', ParseObjectIdPipe) id: string): Observable<About> {
    return this.adminAboutService.findOne$(id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id', ParseObjectIdPipe) id: string): Observable<void> {
    return this.adminAboutService.delete$(id);
  }
}
