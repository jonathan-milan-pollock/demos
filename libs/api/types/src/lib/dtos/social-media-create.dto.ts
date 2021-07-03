import { IsString } from 'class-validator';

import { SocialMediaCreate } from '@dark-rush-photography/shared/types';

export class SocialMediaCreateDto implements SocialMediaCreate {
  @IsString()
  group!: string;

  @IsString()
  slug!: string;
}
