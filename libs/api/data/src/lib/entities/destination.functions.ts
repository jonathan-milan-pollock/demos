/* eslint-disable @typescript-eslint/no-var-requires */
import { BadRequestException, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;

import {
  DestinationMinimalDto,
  DestinationDto,
  EntityType,
} from '@dark-rush-photography/shared/types';
import {
  DEFAULT_ENTITY_GROUP,
  DropboxListFoldersItem,
  DropboxListFoldersResponse,
  DropboxTag,
  PublicContent,
} from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { loadNewEntity } from './entity.functions';
import {
  validateEntityDescription,
  validateEntityLocation,
  validateEntityTitle,
} from './entity-validation.functions';
import { validateFindStarredImage } from '../content/image-validation.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { loadMinimalPublicVideo } from '../content/video.functions';
import { findEntityComments } from '../content/comment.functions';
import { findEntityEmotions } from '../content/emotion.functions';


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

export const updateDestinationDropbox = (
  entityModel: Model<DocumentModel>,
  websitesDropboxClientId: string,
  websitesDropboxClientSecret: string,
  refreshToken: string
): void => {
  const dropbox = new Dropbox({
    fetch,
    clientId: websitesDropboxClientId,
    clientSecret: websitesDropboxClientSecret,
  });
  dropbox.auth.setRefreshToken(refreshToken);

  dropbox
    .filesListFolder({ path: `/websites/destinations/` })
    .then((response: DropboxListFoldersResponse) => {
      if (response.status !== 200) throw new BadRequestException();
      return response.result.entries;
    })
    .then((folders: DropboxListFoldersItem[]) => {
      createDestinationEntities(entityModel, folders);
        return folders;
    })
    .then((folders: DropboxListFoldersItem[]) => {
      addDestinationImages(entityModel, folders);
      return folders;
  });
};

export const createDestinationEntities = (
  entityModel: Model<DocumentModel>,
  folders: DropboxListFoldersItem[]
): void => {
  return folders
    .filter((folder) => folder['.tag'] === DropboxTag.folder)
    .forEach(async (folder) => {
      const documentModels = await entityModel
        .find({ type: EntityType.Destination, slug: folder.name });
      if (documentModels.length == 0) {
        new entityModel({
          ...loadNewEntity({
            type: EntityType.Destination,
            group: DEFAULT_ENTITY_GROUP,
            slug: folder.name,
            isPublic: true,
          }),
        }).save();
      }

      // add images

    });
};

export const addDestinationImages = (
  entityModel: Model<DocumentModel>,
  folders: DropboxListFoldersItem[]
): void => {
  Logger.log('add images')
}

