import { from, Observable } from 'rxjs';

export const ayrsharePostImageOrVideoToLinkedIn$ = (
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
      platforms: ['linkedin'],
      media_urls: [imageOrVideoUrl],
      shorten_links: false,
    })
  );
};

export const ayrsharePostUpTo5ImagesToLinkedIn = (
  ayrshareApiKey: string,
  scheduleDate: Date,
  post: string,
  imageUrls: string[]
): Observable<unknown> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const SocialPost = require('social-post-api');

  const social = new SocialPost(ayrshareApiKey);
  return from(
    social.post({
      scheduleDate: scheduleDate.toISOString(),
      post,
      platforms: ['linkedin'],
      media_urls: [...imageUrls],
      shorten_links: false,
    })
  );
};
