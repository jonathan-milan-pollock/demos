import {
  Controller,
  HttpCode,
  Param,
  Post,
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

import { About, ADMIN } from '@dark-rush-photography/shared/types';
import { AboutDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminAboutService } from './admin-about.service';

@Controller('admin/v1/about')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin About')
export class AdminAboutController {
  constructor(private readonly adminAboutService: AdminAboutService) {}

  @Roles(ADMIN)
  @Post(':slug')
  @ApiCreatedResponse({ type: AboutDto })
  create$(@Param('slug') slug: string): Observable<About> {
    return this.adminAboutService.create$(slug);
  }

  @Roles(ADMIN)
  @Get()
  @ApiOkResponse({ type: [AboutDto] })
  findAll$(): Observable<About[]> {
    return this.adminAboutService.findAll$();
  }

  @Roles(ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: AboutDto })
  findOne$(@Param('id') id: string): Observable<About> {
    return this.adminAboutService.findOne$(id);
  }

  @Roles(ADMIN)
  @Post(':id/delete')
  @HttpCode(204)
  deleteProcess$(@Param('id') id: string): Observable<void> {
    return this.adminAboutService.deleteProcess$(id);
  }
}
