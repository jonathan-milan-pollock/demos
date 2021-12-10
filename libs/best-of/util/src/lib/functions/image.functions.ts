import {
  APPLICATION_CDN_URL,
  APPLICATION_VERSION,
  Image,
  ImageSizeType,
  IMAGE_DIMENSION_MEDIUM_IMAGE_LONGEST_EDGE,
  IMAGE_DIMENSION_SMALL_IMAGE_LONGEST_EDGE,
  PageType,
} from '@dark-rush-photography/best-of/types';

export const findCacheBustingUrl = (imageUrl: string): string => {
  return `${imageUrl}?v=${APPLICATION_VERSION}`;
};

export const findImageSizeType = (width: number): ImageSizeType => {
  let imageSizeType = ImageSizeType.Large;
  if (width < IMAGE_DIMENSION_SMALL_IMAGE_LONGEST_EDGE) {
    imageSizeType = ImageSizeType.Small;
  } else if (
    width > IMAGE_DIMENSION_SMALL_IMAGE_LONGEST_EDGE &&
    width <= IMAGE_DIMENSION_MEDIUM_IMAGE_LONGEST_EDGE
  ) {
    imageSizeType = ImageSizeType.Medium;
  }
  return imageSizeType;
};

export const loadImageGalleryImages = (
  images: Array<number>,
  pageType: PageType,
  width: number
): Array<Image> => {
  let pageTypeString: string;
  switch (pageType) {
    case PageType.Home:
      pageTypeString = 'home-page';
      break;
    case PageType.About:
      pageTypeString = 'about-page';
      break;
    case PageType.Review:
      pageTypeString = 'review-page';
      break;
  }

  const imageSizeType = findImageSizeType(width);
  return images.map((imageNumber) => {
    return {
      imageNumber: imageNumber,
      fileName: `${pageTypeString}-${imageNumber}.jpg`,
      fileNameWithoutExtension: `${pageTypeString}-${imageNumber}`,
      thumbnail: findCacheBustingUrl(
        `${APPLICATION_CDN_URL}/dark-rush-photography-content/${pageTypeString}/fill/${pageTypeString}-${imageNumber}.jpg`
      ),
      original: findCacheBustingUrl(
        `${APPLICATION_CDN_URL}/dark-rush-photography-content/${pageTypeString}/${imageSizeType}/${pageTypeString}-${imageNumber}.jpg`
      ),
      src: findCacheBustingUrl(
        `${APPLICATION_CDN_URL}/dark-rush-photography-content/${pageTypeString}/${imageSizeType}/${pageTypeString}-${imageNumber}.jpg`
      ),
      large: findCacheBustingUrl(
        `${APPLICATION_CDN_URL}/dark-rush-photography-content/${pageTypeString}/large/${pageTypeString}-${imageNumber}.jpg`
      ),
      width: 0,
      height: 0,
    };
  });
};

export const downloadImage = (imageAddress: string, imageFileName: string) => {
  const element = document.createElement('a');
  element.setAttribute('href', imageAddress);
  element.setAttribute('download', imageFileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
