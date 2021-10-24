import * as path from 'path';

export const getPublishImageFileName = (
  slug: string,
  currentImageFileName: string
): string => {
  const parsedImageFileName = path.parse(currentImageFileName);
  return `${slug}${parsedImageFileName.ext}`;
};

export const getPublishImageVideoFileName = (slug: string): string =>
  `${slug}.mp4`;
