import { IsISO8601, IsString } from 'class-validator';

import { Image } from '@dark-rush-photography/shared-types';

export class ImageAddDto implements Partial<Image> {
  @IsString()
  slug!: string;

  @IsISO8601()
  dateCreated!: string;
}
