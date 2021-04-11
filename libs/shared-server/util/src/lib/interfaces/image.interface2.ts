import { BlobPath } from './blob-path.interface';
import { ImageDimension } from './image-dimensions.interface';

export interface Image {
  readonly blobPath: BlobPath;
  blobName: string;
  setImageType(imageType: string): Image;
  imageDimensions(): Readonly<ImageDimension[]>;
}
