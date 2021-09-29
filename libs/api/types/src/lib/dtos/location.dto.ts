import { IsString } from 'class-validator';

import { Location } from '@dark-rush-photography/shared/types';

export class LocationDto implements Location {
  @IsString()
  place!: string;

  @IsString()
  street!: string;

  @IsString()
  city!: string;

  @IsString()
  stateOrProvince!: string;

  @IsString()
  zipCode!: string;

  @IsString()
  country!: string;
}
