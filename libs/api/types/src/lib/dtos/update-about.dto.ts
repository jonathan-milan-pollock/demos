import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageDto } from './image.dto';

export class UpdateAboutDto {
  @IsDefined()
  slug!: string;

  @IsDefined()
  isPublic!: boolean;

  @IsDefined()
  name!: string;

  @IsArray()
  text!: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];
}
