import {
  Controller,
  HttpCode,
  Param,
  Get,
  Put,
  ParseEnumPipe,
  ParseBoolPipe,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  Entity,
  EntityAdminDto,
  EntityCreateDto,
  EntityType,
  EntityUpdateDto,
} from '@dark-rush-photography/shared/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminEntitiesService } from './admin-entities.service';

@Controller({ path: 'admin/entities', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Entities')
export class AdminEntitiesController {
  constructor(private readonly adminEntitiesService: AdminEntitiesService) {}

  @Post()
  @ApiCreatedResponse({ type: EntityAdminDto })
  create$(@Body() entityCreate: EntityCreateDto): Observable<Entity> {
    return this.adminEntitiesService.create$(entityCreate);
  }

  @Put(':id')
  @ApiOkResponse({ type: EntityAdminDto })
  update$(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() entityUpdate: EntityUpdateDto
  ): Observable<Entity> {
    return this.adminEntitiesService.update$(id, entityUpdate);
  }

  @Post(':id/post')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: EntityAdminDto })
  post$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<Entity> {
    return this.adminEntitiesService.post$(entityType, id);
  }

  @Put(':entityType/:id/processing/:isProcessing')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @HttpCode(204)
  setIsProcessing$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('isProcessing', ParseBoolPipe) isProcessing: boolean
  ): Observable<void> {
    return this.adminEntitiesService.setIsProcessing$(
      entityType,
      id,
      isProcessing
    );
  }

  @Get()
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: [EntityAdminDto] })
  findAll$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType
  ): Observable<Entity[]> {
    return this.adminEntitiesService.findAll$(entityType);
  }

  @Get(':id')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: EntityAdminDto })
  findOne$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<Entity> {
    return this.adminEntitiesService.findOne$(entityType, id);
  }

  @Get(':entityType/:id/processing')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: Boolean })
  findIsProcessing$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<boolean> {
    return this.adminEntitiesService.findIsProcessing$(entityType, id);
  }

  @Delete(':id')
  //TODO: Is this necessary?
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @HttpCode(204)
  delete$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<void> {
    return this.adminEntitiesService.delete$(entityType, id);
  }
}
