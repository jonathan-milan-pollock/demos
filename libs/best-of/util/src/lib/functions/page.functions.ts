export const getImagePageUrl = (
  slug: string,
  storageId: string,
  threeSixtyImageStorageId: string
) => {
  return `/${slug}/${
    threeSixtyImageStorageId ? threeSixtyImageStorageId : storageId
  }${threeSixtyImageStorageId ? '/360' : ''}`;
};
