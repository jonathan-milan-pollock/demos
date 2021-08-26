import {
  ImageDimensionType,
  ImageResolution,
  VideoDimensionType,
  VideoResolution,
} from '@dark-rush-photography/shared/types';

export interface Env {
  readonly production: boolean;
  readonly googleDriveClientEmail: string;
  readonly googleDrivePrivateKey: string;
  readonly googleDriveClientsFolderId: string;
  readonly googleDriveWebsitesFolderId: string;
  readonly dropboxEmail: string;
  readonly dropboxClientId: string;
  readonly dropboxClientSecret: string;
  readonly privateAzureStorageConnectionString: string;
  readonly publicAzureStorageConnectionString: string;
  readonly tinyPngApiKey: string;
  readonly ayrshareApiKey: string;
  findImageResolution(imageDimensionType: ImageDimensionType): ImageResolution;
  findThreeSixtyImageResolution(
    imageDimensionType: ImageDimensionType
  ): ImageResolution;
  findVideoResolution(videoDimensionType: VideoDimensionType): VideoResolution;
  findThreeSixtyVideoResolution(
    videoDimensionType: VideoDimensionType
  ): VideoResolution;
}
