import { IsString, IsUUID } from 'class-validator';

import { ThreeSixtyImageAdd } from '@dark-rush-photography/shared/types';

export class ThreeSixtyImageAddDto implements ThreeSixtyImageAdd {
  @IsUUID()
  storageId!: string;

  @IsString()
  fileName!: string;
}
