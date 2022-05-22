import { IsOptional, IsString } from 'class-validator';

import { Location } from '@dark-rush-photography/shared/types';

export class LocationDto implements Location {
  @IsString()
  @IsOptional()
  place?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  stateOrProvince?: string;

  @IsString()
  country!: string;
}
