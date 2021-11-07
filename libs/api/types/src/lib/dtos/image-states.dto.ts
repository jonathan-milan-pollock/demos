import { IsArray } from 'class-validator';

import { ImageState, ImageStates } from '@dark-rush-photography/shared/types';

export class ImageStatesDto implements ImageStates {
  @IsArray()
  imageStates: ImageState[] = [];
}
