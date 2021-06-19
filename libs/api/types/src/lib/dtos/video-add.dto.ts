import { IsEnum, IsISO8601, IsString } from 'class-validator';

import { PostedState, Video } from '@dark-rush-photography/shared-types';

export class VideoAddDto implements Partial<Video> {
  @IsString()
  slug!: string;

  @IsEnum(PostedState)
  state!: PostedState;

  @IsISO8601()
  dateCreated!: string;
}
