import { BlobPath } from '../interfaces/blob-path';
import { Image } from '../interfaces/image';
import { ImageDimension } from '../interfaces/image-dimension';

export class WatermarkImage implements Image {
  blobPath: BlobPath;

  private constructor(blobPath: BlobPath) {
    this.blobPath = blobPath;
  }

  static fromBlobFileNameSections(
    blobFileNameSections: string[]
  ): WatermarkImage {
    return new WatermarkImage({
      publishType: 'watermarked',
      publishedCollectionSetParentName: blobFileNameSections[1],
      publishedCollectionSetName: blobFileNameSections[2],
      publishedCollectionName: blobFileNameSections[3],
      fileName: blobFileNameSections[4],
    });
  }

  static fromBlobPath(blobPath: BlobPath): WatermarkImage {
    return new WatermarkImage({ ...blobPath });
  }

  setImageType(imageType: string): Image {
    const {
      publishType: publishServiceName,
      publishedCollectionSetParentName,
      publishedCollectionSetName,
      publishedCollectionName,
      fileName,
    } = this.blobPath;

    return new WatermarkImage({
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
      publishType: publishServiceName,
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
  /*
    return [
      { ...DrpImageTypeDimensions.thumbnailImageDimension },
      { ...DrpImageTypeDimensions.tileImageDimension },
      { ...DrpImageTypeDimensions.smallImageDimension },
      { ...DrpImageTypeDimensions.mediumImageDimension },
      { ...DrpImageTypeDimensions.largeImageDimension },
      { ...DrpImageTypeDimensions.facebookImageDimension },
    ];
  }*/
}
