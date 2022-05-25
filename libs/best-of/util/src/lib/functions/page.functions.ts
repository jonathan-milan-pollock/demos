export const getImagePageUrl = (
  pathname: string,
  storageId: string,
  threeSixtyImageStorageId: string
) => {
  return `/${pathname}/${
    threeSixtyImageStorageId ? threeSixtyImageStorageId : storageId
  }${threeSixtyImageStorageId ? '/360' : ''}`;
};
