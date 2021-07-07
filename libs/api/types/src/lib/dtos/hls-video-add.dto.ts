import { IsUrl } from 'class-validator';

import { HlsVideoAdd } from '@dark-rush-photography/shared/types';

export class HlsVideoAddDto implements HlsVideoAdd {
  @IsUrl()
  hlsUrl!: string;
}
