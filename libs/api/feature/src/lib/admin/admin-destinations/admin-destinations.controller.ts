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

import { ADMIN, Destination } from '@dark-rush-photography/shared-types';
import {
  DestinationDto,
  DestinationUpdateDto,
} from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminDestinationsService } from './admin-destinations.service';

@Controller('admin/v1/destinations')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Destinations')
export class AdminDestinationsController {
  constructor(
    private readonly adminDestinationsService: AdminDestinationsService
  ) {}

  @Roles(ADMIN)
  @Post(':slug')
  @ApiCreatedResponse({ type: DestinationDto })
  create$(@Param('slug') slug: string): Observable<Destination> {
    return this.adminDestinationsService.create$(slug);
  }

  @Roles(ADMIN)
  @Put(':id')
  @ApiOkResponse({ type: DestinationDto })
  update$(
    @Param('id') id: string,
    @Body() destination: DestinationUpdateDto
  ): Observable<Destination> {
    return this.adminDestinationsService.update$(id, destination);
  }

  @Roles(ADMIN)
  @Get()
  @ApiOkResponse({ type: [DestinationDto] })
  findAll$(): Observable<Destination[]> {
    return this.adminDestinationsService.findAll$();
  }

  @Roles(ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: DestinationDto })
  findOne$(@Param('id') id: string): Observable<Destination> {
    return this.adminDestinationsService.findOne$(id);
  }

  @Roles(ADMIN)
  @Post(':id/post')
  post$(@Param('id') id: string): Observable<Destination> {
    return this.adminDestinationsService.post$(id);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminDestinationsService.delete$(id);
  }
}
