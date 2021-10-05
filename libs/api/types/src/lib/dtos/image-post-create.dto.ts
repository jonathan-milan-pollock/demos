import { IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { ImagePostCreate } from '@dark-rush-photography/shared/types';

export class ImagePostCreateDto implements ImagePostCreate {
  @IsString()
  slug!: string;

  @IsArray()
  @Type(() => String)
  text: string[] = [];
}
