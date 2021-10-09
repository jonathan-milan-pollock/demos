import { IsString } from 'class-validator';

import { LocationDefined } from '@dark-rush-photography/shared/types';

export class LocationDto implements LocationDefined {
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
