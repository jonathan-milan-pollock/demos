import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { EntityFindAllPublicResponse } from '@dark-rush-photography/shared/types';
import { EntityMinimalPublicDto } from './entity-minimal-public.dto';

export class EntityFindAllPublicResponseDto
  implements EntityFindAllPublicResponse
{
  @IsArray()
  @ValidateNested()
  @Type(() => EntityMinimalPublicDto)
  minimalPublicEntities!: EntityMinimalPublicDto[];

  @IsString()
  @IsOptional()
  eventsJsonLdList?: string;
}
