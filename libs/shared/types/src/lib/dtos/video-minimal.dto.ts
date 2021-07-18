import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Min,
} from 'class-validator';

export class VideoMinimalDto {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsString()
  fileName!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  title?: string;

  @IsBoolean()
  isThreeSixty!: boolean;

  @IsUrl()
  @IsOptional()
  hlsUrl?: string;

  @IsBoolean()
  isFlyOver!: boolean;
}
