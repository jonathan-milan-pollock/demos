import { IsString, ValidateNested } from 'class-validator';

import { ExtendedReality } from '@dark-rush-photography/shared-types';
import { GeoCoordinatesDto } from './geo-coordinates.dto';
import { Type } from 'class-transformer';

export class ExtendedRealityDto implements ExtendedReality {
  @IsString()
  slug!: string;

  @ValidateNested()
  @Type(() => GeoCoordinatesDto)
  geo!: GeoCoordinatesDto;
}
