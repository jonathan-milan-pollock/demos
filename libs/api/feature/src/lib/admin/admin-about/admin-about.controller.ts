import {
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { About } from '@dark-rush-photography/shared/types';
import { AboutDto } from '@dark-rush-photography/api/types';
import {
  ParseObjectIdPipe,
  User,
  UserGuard,
} from '@dark-rush-photography/api/util';
import { AdminAboutService } from './admin-about.service';

@Controller('v1/admin/about')
@UseGuards(UserGuard)
@User()
@ApiBearerAuth()
@ApiTags('Admin About')
export class AdminAboutController {
  constructor(private readonly adminAboutService: AdminAboutService) {}

  @Post(':slug')
  @ApiCreatedResponse({ type: AboutDto })
  create$(@Param('slug') slug: string): Observable<About> {
    return this.adminAboutService.create$(slug);
  }

  @Get()
  @ApiOkResponse({ type: [AboutDto] })
  findAll$(): Observable<About[]> {
    return this.adminAboutService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: AboutDto })
  findOne$(@Param('id', ParseObjectIdPipe) id: string): Observable<About> {
    return this.adminAboutService.findOne$(id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id', ParseObjectIdPipe) id: string): Observable<void> {
    return this.adminAboutService.delete$(id);
  }
}
