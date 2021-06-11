import { IsNumber, IsOptional, IsString } from 'class-validator';

import { GeoCoordinates } from '@dark-rush-photography/shared-types';

export class GeoCoordinatesDto implements GeoCoordinates {
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;
}
