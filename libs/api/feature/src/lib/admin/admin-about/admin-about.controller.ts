import {
  Body,
  Delete,
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { About } from '@dark-rush-photography/shared-types';
import { AboutDto, AboutResponseDto } from '@dark-rush-photography/api/types';
import { AdminAboutService } from './admin-about.service';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';

@Controller('admin/v1/about')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('About')
export class AdminAboutController {
  constructor(private readonly adminAboutService: AdminAboutService) {}

  @Roles('admin')
  @Post()
  @ApiCreatedResponse({ type: AboutResponseDto })
  createIfNotExists(@Body() about: AboutDto): Observable<About> {
    return this.adminAboutService.createIfNotExists$(about);
  }

  @Roles('admin')
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Observable<void> {
    return this.adminAboutService.delete$(id);
  }
}
