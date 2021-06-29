import { from, Observable } from 'rxjs';

export const ayrsharePostToYouTube$ = (
  ayrshareApiKey: string,
  scheduleDate: Date,
  title: string,
  post: string,
  thumbnailUrl: string,
  videoUrl: string
): Observable<unknown> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const SocialPost = require('social-post-api');

  const social = new SocialPost(ayrshareApiKey);
  return from(
    social.post({
      scheduleDate: scheduleDate.toISOString(),
      post,
      platforms: ['youtube'],
      media_urls: [videoUrl],
      shorten_links: false,
      youTubeOptions: {
        title,
        youTubeVisibility: 'public',
        thumbNail: thumbnailUrl,
        playListId: 'PLrav6EfwgDX5peD7Ni-pOKa7B13WjLyUB', // optional: Playlist ID to add the video
      },
    })
  );
};
