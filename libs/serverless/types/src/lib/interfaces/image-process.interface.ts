import { ImageProcessState } from '@dark-rush-photography/shared-types';
import { PublishedImage } from './published-image.interface';
import { ImageProcessData } from './image-process-data.interface';

export interface ImageProcess {
  readonly state: ImageProcessState;
  readonly publishedImage: PublishedImage;
  readonly data?: ImageProcessData;
}
