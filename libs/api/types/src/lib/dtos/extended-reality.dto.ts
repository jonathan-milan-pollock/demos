import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ExtendedReality } from '@dark-rush-photography/shared-types';
import { GeoCoordinatesDto } from './geo-coordinates.dto';

export class ExtendedRealityDto implements ExtendedReality {
  @IsString()
  slug!: string;

  @ValidateNested()
  @Type(() => GeoCoordinatesDto)
  geo!: GeoCoordinatesDto;
}
