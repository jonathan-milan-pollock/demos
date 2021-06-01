import { ImageProcessType } from '../types/image-process.type';
import { ImageProcessData } from './image-process-data.interface';
import { PublishedImage } from './published-image.interface';

export interface ImageProcess {
  readonly type: ImageProcessType;
  readonly publishedImage: PublishedImage;
  readonly data?: ImageProcessData;
}
