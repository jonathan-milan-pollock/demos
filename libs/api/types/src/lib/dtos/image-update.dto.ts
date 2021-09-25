import {
  IsBoolean,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ImageUpdateDto {
  @IsString()
  fileName!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsBoolean()
  isStarred!: boolean;

  @IsBoolean()
  isLoved!: boolean;

  @IsString()
  title!: string;

  @IsString()
  seoDescription!: string;

  @IsString()
  seoKeywords!: string;

  @IsISO8601()
  @IsOptional()
  dateCreated?: string;

  @IsISO8601()
  @IsOptional()
  datePublished?: string;
}
