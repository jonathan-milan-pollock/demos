import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { EntityFindOnePublicResponse } from '@dark-rush-photography/shared/types';
import { EntityPublicDto } from './entity-public.dto';

export class EntityFindOnePublicResponseDto
  implements EntityFindOnePublicResponse
{
  @ValidateNested()
  @Type(() => EntityPublicDto)
  publicEntity!: EntityPublicDto;

  @IsString()
  @IsOptional()
  eventJsonLdNewsArticle?: string;
}
