import { ImageProcessType } from '../types/image-process.type';
import { PublishServiceType } from '../types/publish-service.type';
import { ImageDimensionType } from '../types/image-dimension.type';

export interface PublishedImage {
  readonly imageProcessType: ImageProcessType;
  readonly publishServiceType: PublishServiceType;
  readonly publishedCollectionSetParentName?: string;
  readonly publishedCollectionSetName?: string;
  readonly publishedCollectionName?: string;
  readonly imageName: string;
  readonly imageDimensionType?: ImageDimensionType;
  readonly resizeImageDimensionType?: ImageDimensionType;
}
