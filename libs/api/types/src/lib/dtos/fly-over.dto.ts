import { IsDefined, IsOptional } from 'class-validator';

import { FlyOver } from '@dark-rush-photography/shared-types';

export class FlyOverDto implements FlyOver {
  @IsDefined()
  slug!: string;

  @IsOptional()
  titleTrackPath?: string;
}
