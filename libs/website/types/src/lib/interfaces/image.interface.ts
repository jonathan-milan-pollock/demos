import { GridImage } from './grid-image.interface';
import { ImageDownload } from './image-download.interface';

export interface Image extends GridImage, ImageDownload {
  readonly imageNumber: number;
  readonly fileName: string;
  readonly fileNameWithoutExtension: string;
  readonly thumbnail: string;
  readonly original: string;
}
