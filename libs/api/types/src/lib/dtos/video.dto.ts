import { IsMongoId, IsString, IsUUID } from 'class-validator';

import { Video } from '@dark-rush-photography/shared/types';

export class VideoDto implements Video {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsUUID()
  blobPathId!: string;

  @IsString()
  fileName!: string;
}
