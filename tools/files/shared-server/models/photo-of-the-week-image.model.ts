import { BlobPath } from '../interfaces/blob-path.interface';
import { Image } from '../interfaces/image.interface';
import {
  ThumbnailImageDimension,
  TileImageDimension,
  SmallImageDimension,
  MediumImageDimension,
  LargeImageDimension,
  FacebookImageDimension,
  InstagramImageDimension,
  GoogleBusinessImageDimension,
  LinkedInImageDimension,
} from '@dark-rush-photography/shared/util';
import { ImageDimension } from '../interfaces/image-dimensions.interface';

export class PhotoOfTheWeekImage implements Image {
  blobPath: BlobPath;

  private constructor(blobPath: BlobPath) {
    this.blobPath = blobPath;
  }

  static fromBlobFileNameSections(
    blobFileNameSections: string[]
  ): PhotoOfTheWeekImage {
    return new PhotoOfTheWeekImage({
      publishType: 'photo-of-the-week',
      publishedCollectionSetName: blobFileNameSections[1],
      publishedCollectionName: blobFileNameSections[2],
      fileName: blobFileNameSections[3],
    });
  }

  static fromBlobPath(blobPath: BlobPath): PhotoOfTheWeekImage {
    return new PhotoOfTheWeekImage({ ...blobPath });
  }

  setImageType(imageType: string): Image {
    return new PhotoOfTheWeekImage({ ...this.blobPath, imageType });
  }

  get blobName(): string {
    const {
      publishType: publishServiceName,
      publishedCollectionSetName,
      publishedCollectionName,
      imageType,
      fileName,
    } = this.blobPath;

    return imageType
      ? `${publishServiceName}/${publishedCollectionSetName}/${publishedCollectionName}/${imageType}/${fileName}`
      : `${publishServiceName}/${publishedCollectionSetName}/${publishedCollectionName}/${fileName}`;
  }

  imageDimensions(): ImageDimension[] {
    return [
      ThumbnailImageDimension,
      TileImageDimension,
      SmallImageDimension,
      MediumImageDimension,
      LargeImageDimension,
      FacebookImageDimension,
      InstagramImageDimension,
      GoogleBusinessImageDimension,
      LinkedInImageDimension,
    ];
  }
}
