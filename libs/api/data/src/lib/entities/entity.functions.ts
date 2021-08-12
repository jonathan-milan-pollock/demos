/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BadRequestException } from '@nestjs/common';
import {
  DropboxListFoldersItem,
  DropboxListFoldersResponse,
} from '@dark-rush-photography/api/types';
import { Entity, EntityCreateDto } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadImage } from '../content/image.functions';
import { loadImageDimension } from '../content/image-dimension.functions';
import { loadVideo } from '../content/video.functions';
import { loadVideoDimension } from '../content/video-dimension.functions';
import { loadSocialMediaUrl } from '../content/social-media-url.functions';
import { loadComment } from '../content/comment.functions';
import { loadEmotion } from '../content/emotion.functions';

export const loadNewEntity = (entityCreate: EntityCreateDto): Entity => ({
  type: entityCreate.type,
  group: entityCreate.group,
  slug: entityCreate.slug,
  isPublic: entityCreate.isPublic,
  order: 0,
  title: '',
  description: '',
  keywords: [],
  location: {
    country: 'United States',
  },
  useTileImage: false,
  text: [],
  images: [],
  imageDimensions: [],
  videos: [],
  videoDimensions: [],
  hasExtendedReality: false,
  websiteUrl: '',
  socialMediaUrls: [],
  comments: [],
  emotions: [],
});

export const loadEntity = (documentModel: DocumentModel): Entity => ({
  id: documentModel._id,
  type: documentModel.type,
  group: documentModel.group,
  slug: documentModel.slug,
  isPublic: documentModel.isPublic,
  order: documentModel.order,
  title: documentModel.title,
  description: documentModel.description,
  keywords: documentModel.keywords,
  dateCreated: documentModel.dateCreated,
  datePublished: documentModel.datePublished,
  location: documentModel.location,
  useTileImage: documentModel.useTileImage,
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

export const validateDropboxListFoldersResponse = (
  response: any
): DropboxListFoldersItem[] => {
  const listFolderResponse = response as DropboxListFoldersResponse;
  if (listFolderResponse.status !== 200) throw new BadRequestException();
  return listFolderResponse.result.entries;
};

export const loadDocumentModelsArray = (
  documentModels: DocumentModel | DocumentModel[]
): DocumentModel[] => {
  return Array.isArray(documentModels) ? documentModels : [documentModels];
};
