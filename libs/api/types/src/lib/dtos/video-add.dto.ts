import { IsISO8601, IsString, IsUUID } from 'class-validator';

import { Video } from '@dark-rush-photography/shared-types';

export class VideoAddDto implements Partial<Video> {
  @IsString()
  slug!: string;

  @IsISO8601()
  dateCreated!: string;

  @IsUUID()
  imageId!: string;
}
