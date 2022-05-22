export const getSitemapDate = (isoDate: string): string => {
  return isoDate.substring(0, isoDate.indexOf('T'));
};
