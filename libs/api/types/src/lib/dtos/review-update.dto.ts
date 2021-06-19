import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Review } from '@dark-rush-photography/shared-types';

export class ReviewUpdateDto implements Partial<Review> {
  @IsString()
  slug!: string;

  @IsBoolean()
  isPublic!: boolean;

  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  text: string[] = [];
}
