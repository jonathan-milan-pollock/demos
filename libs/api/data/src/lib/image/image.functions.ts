import datauri = require('datauri');

export const getDataUri = async (
  imagePath: string
): Promise<string | undefined> => await datauri(imagePath);
