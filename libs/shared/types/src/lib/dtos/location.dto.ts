import { IsOptional, IsString } from 'class-validator';

import { Location } from '../interfaces/location.interface';

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
}
