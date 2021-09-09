import { IsInt, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageMinimalDto } from './image-minimal.dto';

export class DestinationMinimalDto {
  @IsString()
  slug!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @ValidateNested()
  @Type(() => ImageMinimalDto)
  starredImage!: ImageMinimalDto;
}
