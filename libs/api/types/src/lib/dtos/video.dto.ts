import { IsEnum, IsMongoId, IsString, IsUUID } from 'class-validator';

import { MediaState, Video } from '@dark-rush-photography/shared/types';

export class VideoDto implements Video {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsEnum(MediaState)
  state!: MediaState;

  @IsUUID()
  blobPathId!: string;

  @IsString()
  fileName!: string;
}
