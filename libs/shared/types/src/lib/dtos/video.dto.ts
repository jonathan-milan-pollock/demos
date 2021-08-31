import { IsEnum, IsMongoId, IsString, IsUUID } from 'class-validator';
import { MediaState } from '../enums/media-state.enum';
import { Video } from '../interfaces/video.interface';

export class VideoDto implements Video {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsString()
  fileName!: string;

  @IsEnum(MediaState)
  state!: MediaState;
}
