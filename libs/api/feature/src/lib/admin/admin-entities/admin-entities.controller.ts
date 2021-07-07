import {
  Controller,
  HttpCode,
  Param,
  UseGuards,
  Get,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, EntityType } from '@dark-rush-photography/shared/types';
import {
  EntityTypeValidationPipe,
  Roles,
  RolesGuard,
} from '@dark-rush-photography/api/util';
import { AdminEntitiesService } from './admin-entities.service';

@Controller('admin/v1/entities')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Entities')
export class AdminEntitiesController {
  constructor(private readonly adminEntitiesService: AdminEntitiesService) {}

  @Roles(ADMIN)
  @Get('sitemap')
  @HttpCode(204)
  updateSitemap$(): Observable<string> {
    return this.adminEntitiesService.updateSitemap$();
  }

  @Roles(ADMIN)
  @Put(':entityType/:id/processing/:isProcessing')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @HttpCode(204)
  setIsProcessing$(
    @Param('entityType', new EntityTypeValidationPipe())
    entityType: EntityType,
    @Param('id') id: string,
    @Param('isProcessing') isProcessing: boolean
  ): Observable<void> {
    return this.adminEntitiesService.setIsProcessing$(
      entityType,
      id,
      isProcessing
    );
  }

  @Roles(ADMIN)
  @Get(':entityType/:id/processing')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: Boolean })
  findIsProcessing$(
    @Param('entityType', new EntityTypeValidationPipe())
    entityType: EntityType,
    @Param('id') id: string
  ): Observable<boolean> {
    return this.adminEntitiesService.findIsProcessing$(entityType, id);
  }
}
