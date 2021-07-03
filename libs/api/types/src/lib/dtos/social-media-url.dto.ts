import { IsEnum, IsUrl } from 'class-validator';

import {
  SocialMediaType,
  SocialMediaUrl,
} from '@dark-rush-photography/shared/types';

export class SocialMediaUrlDto implements SocialMediaUrl {
  @IsEnum(SocialMediaType)
  type!: SocialMediaType;

  @IsUrl()
  url!: string;
}
