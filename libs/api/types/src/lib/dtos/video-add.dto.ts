import { IsISO8601, IsString } from 'class-validator';

import { VideoAdd } from '@dark-rush-photography/shared/types';

export class VideoAddDto implements VideoAdd {
  @IsString()
  fileName!: string;

  @IsISO8601()
  dateCreated!: string;
}
