import { BlobPath } from '../interfaces/blob-path.interface';
import { Image } from '../interfaces/image.interface';
import { ImageDimension } from '../interfaces/image-dimensions.interface';

export class DestinationImage implements Image {
  blobPath: BlobPath;

  private constructor(blobPath: BlobPath) {
    this.blobPath = blobPath;
  }

  static fromBlobFileNameSections(
    blobFileNameSections: string[]
  ): DestinationImage {
    return new DestinationImage({
      publish: 'destinations',
      publishedCollectionSetParentName: blobFileNameSections[1],
      publishedCollectionSetName: blobFileNameSections[2],
      publishedCollectionName: blobFileNameSections[3],
      fileName: blobFileNameSections[4],
    });
  }

  static fromBlobPath(blobPath: BlobPath): DestinationImage {
    return new DestinationImage({ ...blobPath });
  }

  setImageType(imageType: string): Image {
    const {
      publish: publishServiceName,
      publishedCollectionSetParentName,
      publishedCollectionSetName,
      publishedCollectionName,
      fileName,
    } = this.blobPath;

    return new DestinationImage({
      publish: publishServiceName,
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
    return [];
  }
}
