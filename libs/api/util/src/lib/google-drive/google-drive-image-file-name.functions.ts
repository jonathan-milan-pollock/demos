import * as path from 'path';
import { ParsedPath } from 'path/posix';

export const getParsedPathOfGoogleDriveImageFileName = (
  googleDriveImageFileName: string
): ParsedPath => {
  const fileName = googleDriveImageFileName;
  const orderFileName = fileName.substring(fileName.lastIndexOf('-') + 1);
  return path.parse(orderFileName);
};

export const getOrderFromGoogleDriveImageFileName = (
  googleDriveImageFileName: string
): number => {
  const orderFileName = getParsedPathOfGoogleDriveImageFileName(
    googleDriveImageFileName
  );
  return +orderFileName.name;
};

export const getSlugWithOrderFromGoogleDriveImageFileName = (
  slug: string,
  googleDriveImageFileName: string
): string => {
  const orderFileName = getParsedPathOfGoogleDriveImageFileName(
    googleDriveImageFileName
  );
  return `${slug}-${orderFileName.name}${orderFileName.ext}`;
};
