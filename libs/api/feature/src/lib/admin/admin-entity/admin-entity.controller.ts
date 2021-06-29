import {
  Delete,
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

import { About, ADMIN } from '@dark-rush-photography/shared-types';
import { AboutDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminEntityService } from './admin-entity.service';

@Controller('admin/v1/entity')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Entity')
export class AdminEntityController {
  constructor(private readonly adminEntityService: AdminEntityService) {}

  @Roles(ADMIN)
  @Post(':slug')
  @ApiCreatedResponse({ type: AboutDto })
  create$(@Param('slug') slug: string): Observable<About> {
    return this.adminEntityService.create$(slug);
  }

  @Roles(ADMIN)
  @Get()
  @ApiOkResponse({ type: [AboutDto] })
  findAll$(): Observable<About[]> {
    return this.adminEntityService.findAll$();
  }

  @Roles(ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: AboutDto })
  findOne$(@Param('id') id: string): Observable<About> {
    return this.adminEntityService.findOne$(id);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminEntityService.delete$(id);
  }
}
