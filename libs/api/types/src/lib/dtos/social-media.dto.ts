import { IsEnum, IsUrl } from 'class-validator';

import { SocialMediaType } from '@dark-rush-photography/shared-types';

export class SocialMediaDto {
  @IsEnum(SocialMediaType)
  type!: SocialMediaType;

  @IsUrl()
  url!: string;
}
