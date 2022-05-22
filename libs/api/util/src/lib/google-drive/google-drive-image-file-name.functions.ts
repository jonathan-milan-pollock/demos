import * as path from 'path';

export const getOrderFromGoogleDriveImageFile = (
  imageFileName: string
): number => {
  const parsedImageFileName = path.parse(imageFileName);
  const order = parsedImageFileName.name.substring(
    parsedImageFileName.name.lastIndexOf('-') + 1
  );
  return +order;
};
