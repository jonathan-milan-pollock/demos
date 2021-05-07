import {
  FacebookImageDimension,
  GoogleBusinessImageDimension,
  InstagramImageDimension,
  LargeImageDimension,
  LinkedInImageDimension,
  MediumImageDimension,
  SmallImageDimension,
  ThumbnailImageDimension,
  TileImageDimension,
} from '../constants/image-dimensions';
import { BlobPath } from '../interfaces/blob-path.interface';
import { Image } from '../interfaces/image.interface';
import { ImageDimension } from '../interfaces/image-dimensions.interface';

export class EventImage implements Image {
  blobPath: BlobPath;

  private constructor(blobPath: BlobPath) {
    this.blobPath = blobPath;
  }

  static fromBlobFileNameSections(blobFileNameSections: string[]): EventImage {
    return new EventImage({
      publish: 'events',
      publishedCollectionSetParentName: blobFileNameSections[1],
      publishedCollectionSetName: blobFileNameSections[2],
      publishedCollectionName: blobFileNameSections[3],
      fileName: blobFileNameSections[4],
    });
  }

  static fromBlobPath(blobPath: BlobPath): EventImage {
    return new EventImage({ ...blobPath });
  }

  setImageType(imageType: string): Image {
    const {
      publish: publishServiceName,
      publishedCollectionSetParentName,
      publishedCollectionSetName,
      publishedCollectionName,
      fileName,
    } = this.blobPath;

    return new StoryImage({
      publishType: publishServiceName,
      publishedCollectionSetParentName,
      publishedCollectionSetName,
      publishedCollectionName,
      imageType,
      fileName,
    });
  }

  get blobName(): string {
    const {
      publish: publishServiceName,
      publishedCollectionSetParentName,
      publishedCollectionSetName,
      publishedCollectionName,
      imageType,
      fileName,
    } = this.blobPath;

    return `${publishServiceName}/${publishedCollectionSetParentName}/${publishedCollectionSetName}/${publishedCollectionName}/${imageType}/${fileName}}`;
  }

  imageDimensions(): ImageDimension[] {
    if (this.blobPath.publishedCollectionName == 'best-of-image') {
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
    return [];
  }
}
