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
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  EntityType,
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import {
  EntityAdminDto,
  EntityMinimalDto,
  EntityUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  AdminAuthGuard,
  AdminRole,
  ParseObjectIdPipe,
} from '@dark-rush-photography/api/util';
import { AdminEntitiesService } from './admin-entities.service';

@Controller({ path: 'admin/entities', version: '1' })
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
@ApiTags('Admin Entities')
export class AdminEntitiesController {
  constructor(private readonly adminEntitiesService: AdminEntitiesService) {}

  @AdminRole()
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

  @AdminRole()
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

  @AdminRole()
  @Put(':entityType/:id/publish')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: EntityAdminDto })
  publish$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('renameMediaWithEntitySlug') renameMediaWithEntitySlug: boolean
  ): Observable<EntityAdminDto> {
    return this.adminEntitiesService.publish$(
      entityType,
      id,
      renameMediaWithEntitySlug
    );
  }

  @AdminRole()
  @Put(':entityType/:id/publishing/:isPublishing')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @HttpCode(204)
  setIsPublishing$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('isPublishing', ParseBoolPipe) isPublishing: boolean
  ): Observable<void> {
    return this.adminEntitiesService.setIsPublishing$(
      entityType,
      id,
      isPublishing
    );
  }

  @AdminRole()
  @Get(':entityWithGroupType/groups')
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

  @AdminRole()
  @Get(':entityWithoutGroupType')
  @ApiParam({
    name: 'entityWithoutGroupType',
    enum: EntityWithoutGroupType,
  })
  @ApiOkResponse({ type: [EntityMinimalDto] })
  findAll$(
    @Param('entityWithoutGroupType', new ParseEnumPipe(EntityWithoutGroupType))
    entityWithoutGroupType: EntityWithoutGroupType
  ): Observable<EntityMinimalDto[]> {
    return this.adminEntitiesService.findAll$(entityWithoutGroupType);
  }

  @AdminRole()
  @Get(':entityWithGroupType/groups/:group')
  @ApiParam({
    name: 'entityWithGroupType',
    enum: EntityWithGroupType,
  })
  @ApiOkResponse({ type: [EntityMinimalDto] })
  findAllForGroup$(
    @Param('entityWithGroupType', new ParseEnumPipe(EntityWithGroupType))
    entityWithGroupType: EntityWithGroupType,
    @Param('group') group: string
  ): Observable<EntityMinimalDto[]> {
    return this.adminEntitiesService.findAllForGroup$(
      entityWithGroupType,
      group
    );
  }

  @AdminRole()
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

  @AdminRole()
  @Get(':entityType/:id/publishing')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: Boolean })
  findIsPublishing$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<boolean> {
    return this.adminEntitiesService.findIsPublishing$(entityType, id);
  }

  @AdminRole()
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
