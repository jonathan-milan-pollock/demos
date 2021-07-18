import { IsString } from 'class-validator';

import { GeoCoordinates } from '../interfaces/geo-coordinates.interface';

export class GeoCoordinatesDto implements GeoCoordinates {
  @IsString()
  latitude!: string;

  @IsString()
  longitude!: string;
}
