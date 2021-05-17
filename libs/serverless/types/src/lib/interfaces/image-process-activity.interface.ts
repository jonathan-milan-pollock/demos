import { ImageProcessActivityType } from '../types/image-process-activity.type';
import { ImageProcessActivityData } from './image-process-activity-data.interface';
import { PublishedImage } from './published-image.interface';

export interface ImageProcessActivity {
  readonly type: ImageProcessActivityType;
  readonly publishedImage: PublishedImage;
  readonly data?: ImageProcessActivityData;
}
