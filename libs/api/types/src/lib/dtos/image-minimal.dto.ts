import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class ImageMinimalDto {
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
}
