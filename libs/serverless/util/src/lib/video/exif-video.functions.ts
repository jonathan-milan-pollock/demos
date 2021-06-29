export const getVideoExif = (videoTitle: string): string => {
  let videoExif = `-metadata title="${videoTitle}"`;
  videoExif += ` -metadata year="${new Date().getFullYear()}"`;
  videoExif += ` -metadata copyright="${new Date().getFullYear()} Dark Rush Photography - All Rights Reserved"`;

  // "title"
  // "author"
  // "year"
  // "copyright"
  // "description"
  // "synopsis"

  return videoExif;
};
