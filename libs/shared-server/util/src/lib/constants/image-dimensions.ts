import { ImageDimension } from '../interfaces/image-dimension.interface';
import { ImageType } from '../enums/image-type.enum';

export const ThumbnailImageDimension: ImageDimension = {
  imageType: ImageType.THUMBNAIL,
  longestEdge: 16,
};

export const TileImageDimension: ImageDimension = {
  imageType: ImageType.TILE,
  width: 256,
  height: 128,
  longestEdge: 256,
};

export const SmallImageDimension: ImageDimension = {
  imageType: ImageType.SMALL,
  longestEdge: 512,
};

export const MediumImageDimension: ImageDimension = {
  imageType: ImageType.MEDIUM,
  longestEdge: 1024,
};

export const LargeImageDimension: ImageDimension = {
  imageType: ImageType.LARGE,
  longestEdge: 2048,
};

export const ThreeSixtyImageDimension: ImageDimension = {
  imageType: ImageType.THREE_SIXTY_THUMBNAIL,
  longestEdge: 52,
};

export const ThreeSixtySmallDimension: ImageDimension = {
  imageType: ImageType.THREE_SIXTY_SMALL,
  longestEdge: 780,
};

export const ThreeSixtyMediumDimension: ImageDimension = {
  imageType: ImageType.THREE_SIXTY_MEDIUM,
  longestEdge: 1560,
};

export const ThreeSixtyLargeDimension: ImageDimension = {
  imageType: ImageType.THREE_SIXTY_LARGE,
  longestEdge: 3120,
};

export const FacebookImageDimension: ImageDimension = {
  imageType: ImageType.FACEBOOK,
  width: 1200,
  height: 630,
};

export const GoogleBusinessImageDimension: ImageDimension = {
  imageType: ImageType.GOOGLE_BUSINESS,
  width: 1200,
  height: 900,
  resizeToExactDimension: true,
};

export const InstagramImageDimension: ImageDimension = {
  imageType: ImageType.INSTAGRAM,
  width: 1080,
  height: 1080,
  resizeToExactDimension: true,
};

export const LinkedInImageDimension: ImageDimension = {
  imageType: ImageType.LINKED_IN,
  width: 1200,
  height: 627,
  resizeToExactDimension: true,
};
