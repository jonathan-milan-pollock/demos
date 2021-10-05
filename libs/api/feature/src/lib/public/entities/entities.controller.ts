import { Controller, Param, Get, ParseEnumPipe } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { EntityType } from '@dark-rush-photography/shared/types';
import {
  EntityMinimalPublicDto,
  EntityPublicDto,
} from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe, Public } from '@dark-rush-photography/api/util';
import { EntitiesService } from './entities.service';

@Controller({ path: 'entities', version: '1' })
@Public()
@ApiTags('Public Entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Get(':entityType')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: [EntityMinimalPublicDto] })
  findAll$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType
  ): Observable<EntityMinimalPublicDto[]> {
    return this.entitiesService.findAll$(entityType);
  }

  @Get(':entityType/:entityId')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: EntityPublicDto })
  findOne$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType,
    @Param('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<EntityPublicDto> {
    return this.entitiesService.findOne$(entityType, entityId);
  }
}