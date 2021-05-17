import { PublishedImage } from '@dark-rush-photography/serverless/types';
import {
  getPublishServiceName,
  getPublishServiceType,
  getPublishedImageForUploadedImageFileNameSections,
} from './upload-image-process.functions';

export const getPublishedImageForUploadedImage = (
  uploadImageFileName: string
): E.Either<Error, PublishedImage> => {
  if (!uploadImageFileName)
    return E.left(new Error('image upload file name must be provided'));

  const fileNameSections = uploadImageFileName.split('|&|');
  if (fileNameSections.length === 0)
    return E.left(
      new Error('|&| must be used to separate publish service segments')
    );

  return pipe(
    getPublishServiceName(fileNameSections[0]),
    getPublishServiceType,
    E.chainW(
      getPublishedImageForUploadedImageFileNameSections(fileNameSections)
    )
  );
};
