import { IsISO8601, IsString } from 'class-validator';

import { ImageAdd } from '@dark-rush-photography/shared/types';

export class ImageAddDto implements ImageAdd {
  @IsString()
  fileName!: string;

  @IsISO8601()
  dateCreated!: string;
}
