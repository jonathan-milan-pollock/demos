import { BlobPath } from '../interfaces/blob-path';
import { Image } from '../interfaces/image';
import { ImageDimension } from '../interfaces/image-dimension';

export class WithoutWatermarkImage implements Image {
  blobPath: BlobPath;

  private constructor(blobPath: BlobPath) {
    this.blobPath = blobPath;
  }

  static fromBlobFileNameSections(
    blobFileNameSections: string[]
  ): WithoutWatermarkImage {
    return new WithoutWatermarkImage({
      publishType: 'without-watermark',
      publishedCollectionSetParentName: blobFileNameSections[1],
      publishedCollectionSetName: blobFileNameSections[2],
      publishedCollectionName: blobFileNameSections[3],
      fileName: blobFileNameSections[4],
    });
  }

  static fromBlobPath(blobPath: BlobPath): WithoutWatermarkImage {
    return new WithoutWatermarkImage({ ...blobPath });
  }

  setImageType(imageType: string): Image {
    const {
      publishType: publishServiceName,
      publishedCollectionSetParentName,
      publishedCollectionSetName,
      publishedCollectionName,
      fileName,
    } = this.blobPath;

    return new WithoutWatermarkImage({
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
    /*
      { ...DrpImageTypeDimensions.thumbnailImageDimension },
      { ...DrpImageTypeDimensions.tileImageDimension },
      { ...DrpImageTypeDimensions.smallImageDimension },
      { ...DrpImageTypeDimensions.mediumImageDimension },
      { ...DrpImageTypeDimensions.largeImageDimension },
      { ...DrpImageTypeDimensions.facebookImageDimension },
    ];*/
  }
}
