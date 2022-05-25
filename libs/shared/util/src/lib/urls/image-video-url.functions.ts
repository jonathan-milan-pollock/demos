export const getImageVideoUrl = (
  imageUrlPrefix: string,
  storageId: string,
  pathname: string
): string => {
  return `${imageUrlPrefix}/${storageId}/${encodeURI(pathname)}.mp4`;
};
