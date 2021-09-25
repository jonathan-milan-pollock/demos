import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImagePostCreate } from '@dark-rush-photography/shared/types';

export class ImagePostCreateDto implements ImagePostCreate {
  @IsString()
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  text: string[] = [];
}
