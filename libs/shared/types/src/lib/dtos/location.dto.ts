import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Location } from '../interfaces/location.interface';
import { GeoCoordinatesDto } from './geo-coordinates.dto';

export class LocationDto implements Location {
  @IsString()
  @IsOptional()
  place?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  stateOrProvince?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsString()
  country!: string;

  @ValidateNested()
  @Type(() => GeoCoordinatesDto)
  @IsOptional()
  geo?: GeoCoordinatesDto;
}
