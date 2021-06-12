import { IsOptional, IsString } from 'class-validator';

import { FlyOver } from '@dark-rush-photography/shared-types';

export class FlyOverDto implements FlyOver {
  @IsString()
  slug!: string;

  @IsString()
  @IsOptional()
  titleTrackPath?: string;
}
