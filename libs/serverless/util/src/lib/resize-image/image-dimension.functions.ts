import sharp = require('sharp');

export const getImageDimension = (
  imageFilePath: string
): Promise<{ width: number; height: number }> =>
  sharp(imageFilePath)
    .metadata()
    .then(({ width, height }) => {
      if (!width) throw new Error('Width was not found');
      if (!height) throw new Error('Height was not found');
      return { width, height };
    });

export const getDestinationImageDimensions = () => {
  // ResizeImage Tile
  // ResizeImage Thumbnail
  // ResizeImage Small
  // ResizeImage Medium
  // ResizeImage Large
  // ResizeImage Facebook
  // ResizeImage Tile
  // ResizeImage Thumbnail
  // ResizeImage Small
  // ResizeImage Medium
  // ResizeImage Large
  // ResizeImage Facebook
};
