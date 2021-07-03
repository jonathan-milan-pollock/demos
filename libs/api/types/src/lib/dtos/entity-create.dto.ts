import { EntityCreate } from '@dark-rush-photography/shared/types';
import { IsNumberString, IsString } from 'class-validator';

export class EntityCreateDto implements EntityCreate {
  @IsNumberString()
  group!: string;

  @IsString()
  slug!: string;
}
