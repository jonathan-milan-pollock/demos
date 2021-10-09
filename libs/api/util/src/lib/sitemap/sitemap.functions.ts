export const getSitemapDate = (isoString: string): string => {
  const date = new Date(isoString);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
