import {
  Destination,
  DestinationMinimalDto,
  DestinationDto,
} from '@dark-rush-photography/shared/types';
import { PublicContent } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  validateEntityDescription,
  validateEntityLocation,
  validateEntityTitle,
} from './entity-validation.functions';
import { validateFindStarredImage } from '../content/image-validation.functions';
import { loadImage, loadMinimalPublicImage } from '../content/image.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { loadMinimalPublicVideo, loadVideo } from '../content/video.functions';
import { loadVideoDimension } from '../content/video-dimension.functions';
import { loadSocialMediaUrl } from '../content/social-media-url.functions';
import { findEntityComments, loadComment } from '../content/comment.functions';
import { findEntityEmotions, loadEmotion } from '../content/emotion.functions';

export const loadNewDestination = (slug: string): Destination => ({
  slug,
  isPublic: false,
  order: 0,
  keywords: [],
  text: [],
  images: [],
  imageDimensions: [],
  videos: [],
  videoDimensions: [],
  hasExtendedReality: false,
  socialMediaUrls: [],
  comments: [],
  emotions: [],
});

export const loadDestination = (documentModel: DocumentModel): Destination => ({
  id: documentModel._id,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  order: documentModel.order,
  title: documentModel.title,
  description: documentModel.description,
  keywords: documentModel.keywords,
  location: documentModel.location,
  text: documentModel.text,
  images: documentModel.images.map(loadImage),
  imageDimensions: documentModel.imageDimensions.map(loadImageDimension),
  videos: documentModel.videos.map(loadVideo),
  videoDimensions: documentModel.videoDimensions.map(loadVideoDimension),
  hasExtendedReality: documentModel.hasExtendedReality,
  websiteUrl: documentModel.websiteUrl,
  socialMediaUrls: documentModel.socialMediaUrls.map(loadSocialMediaUrl),
  comments: documentModel.comments.map(loadComment),
  emotions: documentModel.emotions.map(loadEmotion),
});

export const loadMinimalDestinationPublic = (
  documentModel: DocumentModel,
  publicContent: PublicContent
): DestinationMinimalDto => ({
  slug: documentModel.slug,
  order: documentModel.order,
  title: validateEntityTitle(documentModel),
  starredImage: validateFindStarredImage(publicContent.images),
  hasExtendedReality: documentModel.hasExtendedReality,
});

export const loadDestinationPublic = (
  documentModel: DocumentModel,
  publicContent: PublicContent
): DestinationDto => {
  const entityComments = findEntityComments(publicContent.comments);
  const entityEmotions = findEntityEmotions(
    publicContent.emotions,
    publicContent.comments
  );

  return {
    slug: documentModel.slug,
    order: documentModel.order,
    title: validateEntityTitle(documentModel),
    description: validateEntityDescription(documentModel),
    keywords: documentModel.keywords,
    location: validateEntityLocation(documentModel),
    text: documentModel.text,
    images: publicContent.images.map(loadMinimalPublicImage),
    videos: publicContent.videos.map(loadMinimalPublicVideo),
    hasExtendedReality: documentModel.hasExtendedReality,
    websiteUrl: documentModel.websiteUrl,
    socialMediaUrls: documentModel.socialMediaUrls,
    comments: entityComments,
    emotions: entityEmotions,
  };
};
