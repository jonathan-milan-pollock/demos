import { IsString } from 'class-validator';

import { GeoCoordinates } from '@dark-rush-photography/shared-types';

export class GeoCoordinatesDto implements GeoCoordinates {
  @IsString()
  latitude!: string;

  @IsString()
  longitude!: string;
}
