import { ImageDimensionState } from '@dark-rush-photography/shared-types';
import { PublishedImage } from './published-image.interface';
import { ImageActivityConfig } from './image-activity-config.interface';

export interface ImageActivity {
  readonly state: ImageDimensionState;
  readonly publishedImage: PublishedImage;
  readonly config?: ImageActivityConfig;
}
