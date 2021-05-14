import { StandardImageDimension } from '@dark-rush-photography/serverless/types';
import sharp = require('sharp');

export const resizeImage = (
  imageFilePath: string,
  standardImageDimension: StandardImageDimension
) => {
  console.log('resize image');
  sharp(imageFilePath)
    .resize(200, 300, {
      kernel: sharp.kernel.nearest,
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0.5 },
    })
    .toFile('output.png')
    .then(() => {
      // output.png is a 200 pixels wide and 300 pixels high image
      // containing a nearest-neighbour scaled version
      // contained within the north-east corner of a semi-transparent white canvas
    });
};

/**
            else if (resizeToExactDimensions)
            {
                var backgroundColor = Environment.GetEnvironmentVariable("RESIZE_IMAGE_EXACT_BACKGROUND_COLOR");

                magickImage.AdaptiveResize(width, height);
                magickImage.Page.Width = width;
                magickImage.Page.Height = height;
                ((MagickImage) magickImage).BackgroundColor = new MagickColor(backgroundColor);
                magickImage.Extent(width, height, Gravity.Center);
            }
            else
            {
                magickImage.Resize(width, height);
            }

            magickImage.Write(tempImagePath);
        }
    }
 * 
 * 
 */
