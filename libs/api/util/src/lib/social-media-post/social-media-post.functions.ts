/* eslint-disable @typescript-eslint/no-var-requires */
import { ConflictException } from '@nestjs/common';

import { from, map, Observable } from 'rxjs';
const SocialPost = require('social-post-api');

import {
  Image,
  ImageDimensionType,
  SocialMediaType,
  Video,
  YOUTUBE_VIDEO_PLAYLIST_ID,
} from '@dark-rush-photography/shared/types';
import { getSocialMediaTypePlatform } from '../enums/social-media-type.functions';
import { getAzureStorageBlobPathWithImageDimension } from '../azure-storage/azure-storage-blob-path.functions';

export const postSocialMediaImage$ = (
  socialMediaType: SocialMediaType,
  starredImage: Image,
  post: string,
  ayrshareApiKey: string
): Observable<void> => {
  if (socialMediaType === SocialMediaType.YouTube) {
    throw new ConflictException('Images cannot be posted to YouTube');
  }

  const social = new SocialPost(ayrshareApiKey);
  return from(
    social.post({
      scheduleDate: new Date().toISOString(),
      post,
      platforms: [getSocialMediaTypePlatform(socialMediaType)],
      media_urls: [
        getAzureStorageBlobPathWithImageDimension(
          starredImage.storageId,
          starredImage.fileName,
          ImageDimensionType.Facebook
        ),
      ],
      shorten_links: false,
    })
  ).pipe(map(() => undefined));
};

export const postSocialMediaVideo$ = (
  socialMediaType: SocialMediaType,
  video: Video,
  starredImage: Image,
  title: string,
  post: string,
  ayrshareApiKey: string
): Observable<void> => {
  const social = new SocialPost(ayrshareApiKey);
  if (socialMediaType === SocialMediaType.YouTube) {
    return from(
      social.post({
        scheduleDate: new Date().toISOString(),
        post,
        platforms: [getSocialMediaTypePlatform(socialMediaType)],
        media_urls: [`${video.storageId}/${video.fileName}`],
        shorten_links: false,
        youTubeOptions: {
          title,
          youTubeVisibility: 'public',
          thumbNail: getAzureStorageBlobPathWithImageDimension(
            starredImage.storageId,
            starredImage.fileName,
            ImageDimensionType.Facebook
          ),
          playListId: YOUTUBE_VIDEO_PLAYLIST_ID,
        },
      })
    ).pipe(map(() => undefined));
  }
  return from(
    social.post({
      scheduleDate: new Date().toISOString(),
      post,
      platforms: [getSocialMediaTypePlatform(socialMediaType)],
      media_urls: [
        getAzureStorageBlobPathWithImageDimension(
          starredImage.storageId,
          starredImage.fileName,
          ImageDimensionType.Facebook
        ),
      ],
      shorten_links: false,
    })
  ).pipe(map(() => undefined));
};
