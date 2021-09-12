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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
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

  @Post(':entityType/:id/watch')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: Boolean })
  watch$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<EntityAdminDto> {
    return this.adminEntitiesService.watch$(entityType, id);
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

  @Put(':entityType/:id/publish')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: EntityAdminDto })
  publish$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<EntityAdminDto> {
    return this.adminEntitiesService.websitePost$(entityType, id);
  }

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

  @Get(':entityType')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiQuery({
    name: 'group',
    required: false,
    type: String,
  })
  @ApiOkResponse({ type: [EntityMinimalDto] })
  findAll$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Query('group') group?: string
  ): Observable<EntityMinimalDto[]> {
    return this.adminEntitiesService.findAll$(entityType, group);
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
