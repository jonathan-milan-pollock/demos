import { IsString } from 'class-validator';

import { SocialMedia } from '@dark-rush-photography/shared-types';

export class SocialMediaCreateDto implements Partial<SocialMedia> {
  @IsString()
  group!: string;

  @IsString()
  slug!: string;
}
