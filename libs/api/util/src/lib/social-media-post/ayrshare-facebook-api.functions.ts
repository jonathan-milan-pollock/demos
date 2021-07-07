import { from, Observable } from 'rxjs';

import { FacebookCarouselImage } from '@dark-rush-photography/serverless/types';

export const ayrsharePostImageOrVideoToFacebook$ = (
  ayrshareApiKey: string,
  scheduleDate: Date,
  post: string,
  imageOrVideoUrl: string
): Observable<unknown> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const SocialPost = require('social-post-api');
  const social = new SocialPost(ayrshareApiKey);
  return from(
    social.post({
      scheduleDate: scheduleDate.toISOString(),
      post,
      platforms: ['facebook'],
      media_urls: [imageOrVideoUrl],
      shorten_links: false,
    })
  );
};

export const ayrshareUpTo10ImagesPostToFacebook$ = (
  ayrshareApiKey: string,
  scheduleDate: Date,
  post: string,
  imageCaptions: string[],
  imageUrls: FacebookCarouselImage[],
  carouselSeeMoreAtLink: string
): Observable<unknown> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const SocialPost = require('social-post-api');
  const social = new SocialPost(ayrshareApiKey);
  return from(
    social.post({
      scheduleDate: scheduleDate.toISOString(),
      post,
      platforms: ['facebook'],
      mediaCaptions: [...imageCaptions],
      faceBookOptions: {
        carousel: {
          items: [...imageUrls],
          link: carouselSeeMoreAtLink,
        },
      },
      shorten_links: false,
    })
  );
};
