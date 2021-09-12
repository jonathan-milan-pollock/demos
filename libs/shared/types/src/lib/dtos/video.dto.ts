import { IsEnum, IsMongoId, IsString, IsUUID } from 'class-validator';
import { MediaState } from '../enums/media-state.enum';

export class VideoDto {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsString()
  fileName!: string;

  @IsEnum(MediaState)
  state!: MediaState;
}
