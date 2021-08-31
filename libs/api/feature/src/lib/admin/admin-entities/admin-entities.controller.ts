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
  EntityAdminDto,
  EntityCreateDto,
  EntityMinimalDto,
  EntityType,
  EntityUpdateDto,
} from '@dark-rush-photography/shared/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminEntitiesService } from './admin-entities.service';
import { Public } from '@dark-rush-photography/shared-server/util';

@Controller({ path: 'admin/entities', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Entities')
@Public()
export class AdminEntitiesController {
  constructor(private readonly adminEntitiesService: AdminEntitiesService) {}

  @Post()
  @ApiCreatedResponse({ type: EntityAdminDto })
  create$(@Body() entityCreate: EntityCreateDto): Observable<EntityAdminDto> {
    return this.adminEntitiesService.create$(entityCreate);
  }

  @Put(':entityType/:id')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: EntityAdminDto })
  update$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() entityUpdate: EntityUpdateDto
  ): Observable<EntityAdminDto> {
    return this.adminEntitiesService.update$(entityType, id, entityUpdate);
  }

  @Post(':entityType/:id/website-post')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: EntityAdminDto })
  post$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<EntityAdminDto> {
    return this.adminEntitiesService.post$(entityType, id);
  }

  @Post(':entityType/:id/social-media-post')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: EntityAdminDto })
  socialMediaPost$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<EntityAdminDto> {
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

  @Get(':entityType')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: [EntityMinimalDto] })
  findAll$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType
  ): Observable<EntityMinimalDto[]> {
    return this.adminEntitiesService.findAll$(entityType);
  }

  @Get(':entityType/:id')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: EntityAdminDto })
  findOne$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<EntityAdminDto> {
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

  @Delete(':entityType/:id')
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
