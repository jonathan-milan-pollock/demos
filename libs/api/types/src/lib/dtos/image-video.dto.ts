import { IsString, IsUUID } from 'class-validator';

import { ImageVideo } from '@dark-rush-photography/shared/types';

export class ImageVideoDto implements ImageVideo {
  @IsUUID()
  storageId!: string;

  @IsString()
  slug!: string;
}
