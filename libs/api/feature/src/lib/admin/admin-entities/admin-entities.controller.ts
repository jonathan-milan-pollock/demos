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
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  EntityAdminDto,
  EntityMinimalDto,
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
  websitePost$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<EntityAdminDto> {
    return this.adminEntitiesService.websitePost$(entityType, id);
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
    return this.adminEntitiesService.socialMediaPost$(entityType, id);
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

  @Get(':entityType/groups')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: [String] })
  findAllGroups$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType
  ): Observable<string[]> {
    return this.adminEntitiesService.findAllGroups$(entityType);
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

  @Get(':entityType/group/:group')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: [EntityMinimalDto] })
  findAllInGroup$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('group') group: string
  ): Observable<EntityMinimalDto[]> {
    return this.adminEntitiesService.findAllInGroup$(entityType, group);
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
