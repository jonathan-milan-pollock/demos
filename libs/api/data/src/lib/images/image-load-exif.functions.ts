export const loadExifImageCreatedDate = (
  date: Date,
  entityCreatedDate?: string,
  imageCreatedDate?: string
): string => entityCreatedDate ?? imageCreatedDate ?? date.toISOString();

export const loadExifImagePublishedDate = (
  date: Date,
  entityPublishedDate?: string
): string => entityPublishedDate ?? date.toISOString();

export const loadExifImageSeoKeywords = (
  entitySeoKeywords: string[],
  imageSeoKeywords?: string
): string[] => {
  const entityKeywords = new Set([
    'Dark Rush Photography',
    'Photography',
    ...entitySeoKeywords,
  ]);

  if (!imageSeoKeywords) return [...entityKeywords];

  const entityAndImageSeoKeywords = new Set([...entityKeywords]);
  imageSeoKeywords
    .split(',')
    .forEach((imageSeoKeyword) =>
      entityAndImageSeoKeywords.add(imageSeoKeyword)
    );
  return [...entityAndImageSeoKeywords];
};
