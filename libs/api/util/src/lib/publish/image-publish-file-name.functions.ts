import * as path from 'path';

export const getPublishFileName = (
  slug: string,
  order: number,
  imageFileName: string,
  renameWithSlug: boolean
): string => {
  if (!renameWithSlug) return imageFileName;

  const parsedImageFileName = path.parse(imageFileName);
  return `${slug}-${order}${parsedImageFileName.ext}`;
};
