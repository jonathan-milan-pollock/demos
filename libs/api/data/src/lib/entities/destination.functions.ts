import { Destination, EntityType } from '@dark-rush-photography/shared/types';
import { Content } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../content/image.functions';
import { toImageDimension } from '../content/image-dimension.functions';
import { toVideo } from '../content/video.functions';
import { toVideoDimension } from '../content/video-dimension.functions';
import { toSocialMediaUrl } from '../content/social-media-url.functions';
import { toComment } from '../content/comment.functions';
import { toEmotion } from '../content/emotion.functions';

export const newDestination = (slug: string): Destination =>
  ({
    type: EntityType.Destination,
    slug,
    isPublic: false,
    keywords: [],
    useTileImage: false,
    text: [],
    images: [],
    imageDimensions: [],
    videos: [],
    videoDimensions: [],
    hasExtendedReality: false,
    socialMediaUrls: [],
    comments: [],
    emotions: [],
  } as Destination);

export const destinationFromDocumentModel = (
  documentModel: DocumentModel
): Destination => ({
  id: documentModel._id,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  title: documentModel.title,
  description: documentModel.description,
  keywords: documentModel.keywords,
  datePublished: documentModel.datePublished,
  location: documentModel.location,
  useTileImage: documentModel.useTileImage,
  text: documentModel.text,
  images: documentModel.images.map((image) => toImage(image)),
  imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
    toImageDimension(imageDimension)
  ),
  videos: documentModel.videos.map((video) => toVideo(video)),
  videoDimensions: documentModel.videoDimensions.map((videoDimension) =>
    toVideoDimension(videoDimension)
  ),
  hasExtendedReality: documentModel.hasExtendedReality,
  websiteUrl: documentModel.websiteUrl,
  socialMediaUrls: documentModel.socialMediaUrls.map((socialMediaUrl) =>
    toSocialMediaUrl(socialMediaUrl)
  ),
  comments: documentModel.comments.map((comment) => toComment(comment)),
  emotions: documentModel.emotions.map((emotion) => toEmotion(emotion)),
});

export const destinationFromDocumentModelPublic = (
  documentModel: DocumentModel,
  publicContent: Content
): Destination => ({
  id: documentModel._id,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  title: documentModel.title,
  description: documentModel.description,
  keywords: documentModel.keywords,
  datePublished: documentModel.datePublished,
  location: documentModel.location,
  useTileImage: documentModel.useTileImage,
  text: documentModel.text,
  images: publicContent.images,
  imageDimensions: publicContent.imageDimensions,
  videos: publicContent.videos,
  videoDimensions: publicContent.videoDimensions,
  hasExtendedReality: documentModel.hasExtendedReality,
  websiteUrl: documentModel.websiteUrl,
  socialMediaUrls: documentModel.socialMediaUrls.map((socialMediaUrl) =>
    toSocialMediaUrl(socialMediaUrl)
  ),
  comments: publicContent.comments,
  emotions: publicContent.emotions,
});
