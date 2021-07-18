import { IsEnum, IsString } from 'class-validator';

import { MediaProcessType } from '../enums/media-process-type.enum';

export class MediaProcessCreateDto {
  @IsEnum(MediaProcessType)
  type!: MediaProcessType;

  @IsString()
  slug!: string;
}
