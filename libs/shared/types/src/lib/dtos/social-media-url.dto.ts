import { IsEnum, IsUrl } from 'class-validator';

import { SocialMediaType } from '../enums/social-media-type.enum';
import { SocialMediaUrl } from '../interfaces/social-media-url.interface';

export class SocialMediaUrlDto implements SocialMediaUrl {
  @IsEnum(SocialMediaType)
  type!: SocialMediaType;

  @IsUrl()
  url!: string;
}
