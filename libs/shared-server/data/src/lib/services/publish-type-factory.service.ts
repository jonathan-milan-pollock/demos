import { BlobPath } from '../interfaces/blob-path';
import { Image } from '../interfaces/image';
import { DestinationImage } from '../models/destination-image';
import { PhotoOfTheWeekImage } from '../models/photo-of-the-week-image';
import { StoryImage } from '../models/story-image';
import { WatermarkImage } from '../models/watermark-image';
import { WithoutWatermarkImage } from '../models/without-watermark-image';

export const publishTypeFromUploadFileName = (
  uploadFileName: string
): Image => {
  const blobFileNameSections = uploadFileName.split('|&|');

  if (!blobFileNameSections[0]) throw new Error(); // TODO: Do something else with this

  switch (blobFileNameSections[0].toLowerCase().replace(/\s+/g, '')) {
    case 'photooftheweek':
      return PhotoOfTheWeekImage.fromBlobFileNameSections(blobFileNameSections);
    case 'stories':
      return StoryImage.fromBlobFileNameSections(blobFileNameSections);
    case 'destinations':
      return DestinationImage.fromBlobFileNameSections(blobFileNameSections);
    case 'watermark':
      return WatermarkImage.fromBlobFileNameSections(blobFileNameSections);
    case 'withoutwatermark':
      return WithoutWatermarkImage.fromBlobFileNameSections(
        blobFileNameSections
      );
    default:
      throw new Error(); // TODO: Don't do this
  }
};

export const fromBlobPath = (blobPath: BlobPath): Image => {
  switch (blobPath.publishType) {
    case 'photo-of-the-week':
      return PhotoOfTheWeekImage.fromBlobPath(blobPath);
    case 'stories':
      return StoryImage.fromBlobPath(blobPath);
    case 'destinations':
      return DestinationImage.fromBlobPath(blobPath);
    case 'watermarked':
      return WatermarkImage.fromBlobPath(blobPath);
    case 'without-watermark':
      return WithoutWatermarkImage.fromBlobPath(blobPath);
  }
};
