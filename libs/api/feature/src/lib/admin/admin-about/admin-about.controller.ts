import {
  Delete,
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { About, ADMIN } from '@dark-rush-photography/shared-types';
import { AboutDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminAboutService } from './admin-about.service';

@Controller('admin/v1/about')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('About')
export class AdminAboutController {
  constructor(private readonly adminAboutService: AdminAboutService) {}

  @Roles(ADMIN)
  @Post()
  @ApiCreatedResponse({ type: AboutDto })
  @ApiConflictResponse()
  @ApiBadRequestResponse()
  create$(@Param('slug') slug: string): Observable<About> {
    return this.adminAboutService.create$(slug);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminAboutService.delete$(id);
  }
}
