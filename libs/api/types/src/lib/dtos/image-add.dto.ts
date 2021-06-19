import { IsEnum, IsISO8601, IsString } from 'class-validator';

import { Image, PostedState } from '@dark-rush-photography/shared-types';

export class ImageAddDto implements Partial<Image> {
  @IsString()
  slug!: string;

  @IsEnum(PostedState)
  state!: PostedState;

  @IsISO8601()
  dateCreated!: string;
}
