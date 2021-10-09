import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseEnumPipe,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import {
  EntityAdminDto,
  EntityMinimalAdminDto,
  EntityUpdateDto,
} from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminEntitiesService } from '@dark-rush-photography/api/data';

@Controller({ path: 'admin/entities', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Entities')
export class AdminEntitiesController {
  constructor(private readonly adminEntitiesService: AdminEntitiesService) {}

  @Put(':entityId')
  @HttpCode(204)
  update$(
    @Param('entityId', ParseObjectIdPipe) entityId: string,
    @Body() entityUpdate: EntityUpdateDto
  ): Observable<void> {
    return this.adminEntitiesService.update$(entityId, entityUpdate);
  }

  @Put(':entityId/load-new-images')
  @HttpCode(204)
  loadNewImages$(
    @Param('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.adminEntitiesService.loadNewImages$(entityId);
  }

  @Put(':entityId/publish')
  @HttpCode(204)
  publish$(
    @Param('entityId', ParseObjectIdPipe) entityId: string,
    @Query('post-social-media', ParseBoolPipe) postSocialMedia: boolean
  ): Observable<void> {
    return this.adminEntitiesService.publish$(entityId, postSocialMedia);
  }

  @Put(':entityId/processing/:isProcessing')
  @HttpCode(204)
  setIsProcessing$(
    @Param('entityId', ParseObjectIdPipe) entityId: string,
    @Param('isProcessing', ParseBoolPipe) isProcessing: boolean
  ): Observable<void> {
    return this.adminEntitiesService.setIsProcessing$(entityId, isProcessing);
  }

  @Get('entity-type/:entityWithGroupType/groups')
  @ApiParam({
    name: 'entityWithGroupType',
    enum: EntityWithGroupType,
  })
  @ApiOkResponse({ type: [String] })
  findGroups$(
    @Param('entityWithGroupType', new ParseEnumPipe(EntityWithGroupType))
    entityWithGroupType: EntityWithGroupType
  ): Observable<string[]> {
    return this.adminEntitiesService.findGroups$(entityWithGroupType);
  }

  @Get('entity-type/:entityWithoutGroupType')
  @ApiParam({
    name: 'entityWithoutGroupType',
    enum: EntityWithoutGroupType,
  })
  @ApiOkResponse({ type: [EntityMinimalAdminDto] })
  findAll$(
    @Param('entityWithoutGroupType', new ParseEnumPipe(EntityWithoutGroupType))
    entityWithoutGroupType: EntityWithoutGroupType
  ): Observable<EntityMinimalAdminDto[]> {
    return this.adminEntitiesService.findAll$(entityWithoutGroupType);
  }

  @Get('entity-type/:entityWithGroupType/groups/:group')
  @ApiParam({
    name: 'entityWithGroupType',
    enum: EntityWithGroupType,
  })
  @ApiOkResponse({ type: [EntityMinimalAdminDto] })
  findAllForGroup$(
    @Param('entityWithGroupType', new ParseEnumPipe(EntityWithGroupType))
    entityWithGroupType: EntityWithGroupType,
    @Param('group') group: string
  ): Observable<EntityMinimalAdminDto[]> {
    return this.adminEntitiesService.findAllForGroup$(
      entityWithGroupType,
      group
    );
  }

  @Get(':entityId')
  @ApiOkResponse({ type: EntityAdminDto })
  findOne$(
    @Param('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<EntityAdminDto> {
    return this.adminEntitiesService.findOne$(entityId);
  }

  @Delete(':entityId')
  @HttpCode(204)
  delete$(
    @Param('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.adminEntitiesService.delete$(entityId);
  }
}
