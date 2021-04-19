import { DownloadImage } from './download-image.interface';
import { GridImage } from './grid-image.interface';

export interface Image extends GridImage, DownloadImage {
  imageNumber: number;
  fileName: string;
  fileNameWithoutExtension: string;
  thumbnail: string;
  original: string;
}
