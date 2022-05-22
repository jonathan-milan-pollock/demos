import { Controller, Param, Get, ParseEnumPipe } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { EntityType } from '@dark-rush-photography/shared/types';
import {
  EntityFindAllPublicResponseDto,
  EntityFindOnePublicResponseDto,
} from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe, Public } from '@dark-rush-photography/api/util';
import { PublicEntitiesService } from '@dark-rush-photography/api/data';

@Controller({ path: 'entities', version: '1' })
@Public()
@ApiTags('Public Entities')
export class EntitiesController {
  constructor(private readonly publicEntitiesService: PublicEntitiesService) {}

  @Get('entity-type/:entityType')
  @ApiParam({
    name: 'entityType',
    enum: EntityType,
  })
  @ApiOkResponse({ type: EntityFindAllPublicResponseDto })
  findAllPublic$(
    @Param('entityType', new ParseEnumPipe(EntityType))
    entityType: EntityType
  ): Observable<EntityFindAllPublicResponseDto> {
    return this.publicEntitiesService.findAllPublic$(entityType);
  }

  @Get(':entityId')
  @ApiOkResponse({ type: EntityFindOnePublicResponseDto })
  findOnePublic$(
    @Param('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<EntityFindOnePublicResponseDto> {
    return this.publicEntitiesService.findOnePublic$(entityId);
  }
}
