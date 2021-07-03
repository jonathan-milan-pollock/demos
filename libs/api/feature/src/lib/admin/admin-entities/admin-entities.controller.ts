import {
  Delete,
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
  Get,
  Body,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, Entity, EntityType } from '@dark-rush-photography/shared/types';
import {
  EntityCreateDto,
  EntityDto,
  EntityUpdateDto,
} from '@dark-rush-photography/api/types';
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
  @Post(':entityType')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiCreatedResponse({ type: EntityDto })
  create$(
    @Param('entityType', new EntityTypeValidationPipe())
    entityType: EntityType,
    @Body() entityCreate: EntityCreateDto
  ): Observable<Entity> {
    return this.adminEntitiesService.create$(entityType, entityCreate);
  }

  @Roles(ADMIN)
  @Put(':entityType/:id')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: EntityDto })
  update$(
    @Param('entityType', new EntityTypeValidationPipe())
    entityType: EntityType,
    @Param('id') id: string,
    @Body() entityUpdate: EntityUpdateDto
  ): Observable<Entity> {
    return this.adminEntitiesService.update$(entityType, id, entityUpdate);
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
  @Post(':entityType')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: [EntityDto] })
  findAll$(
    @Param('entityType', new EntityTypeValidationPipe())
    entityType: EntityType
  ): Observable<Entity[]> {
    return this.adminEntitiesService.findAll$(entityType);
  }

  @Roles(ADMIN)
  @Get(':entityType/:id')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: EntityDto })
  findOne$(
    @Param('entityType', new EntityTypeValidationPipe())
    entityType: EntityType,
    @Param('id') id: string
  ): Observable<Entity> {
    return this.adminEntitiesService.findOne$(entityType, id);
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

  // TODO: Get Sitemap

  @Roles(ADMIN)
  @Delete(':entityType/:id')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @HttpCode(204)
  delete$(
    @Param('entityType', new EntityTypeValidationPipe())
    entityType: EntityType,
    @Param('id') id: string
  ): Observable<void> {
    return this.adminEntitiesService.delete$(entityType, id);
  }
}
