import { PublishedImage } from '@dark-rush-photography/serverless/types';
import {
  getPublishServiceName,
  getPublishServiceType,
  getPublishedImageForUploadedImageFileNameSections,
} from './upload-image-process.functions';

export const getPublishedImageForUploadedImage = (
  uploadImageFileName: string
): PublishedImage | undefined => {
  if (!uploadImageFileName)
    throw new Error('image upload file name must be provided');

  const fileNameSections = uploadImageFileName.split('|&|');
  if (fileNameSections.length === 0)
    throw new Error('|&| must be used to separate publish service segments');

  const publishServiceName = getPublishServiceName(fileNameSections[0]);
  const publishServiceType = getPublishServiceType(publishServiceName);
  if (!publishServiceType)
    throw new Error(`Publish service type ${publishServiceType} was not found`);

  return getPublishedImageForUploadedImageFileNameSections(
    publishServiceType,
    fileNameSections
  );
};
