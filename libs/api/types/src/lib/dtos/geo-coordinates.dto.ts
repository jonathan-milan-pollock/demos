import { IsNumber } from 'class-validator';

import { GeoCoordinates } from '@dark-rush-photography/shared-types';

export class GeoCoordinatesDto implements GeoCoordinates {
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;
}
