/* eslint-disable @typescript-eslint/no-var-requires */
import { BadRequestException, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;

import {
  EventMinimalDto,
  ImageDimensionType,
  EventDto,
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
  validateEntityDateCreated,
  validateEntityDescription,
  validateEntityLocation,
  validateEntityTitle,
} from './entity-validation.functions';
import {
  validateFindImageDimension,
  validateFindStarredImage,
} from '../content/image-validation.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { loadMinimalPublicVideo } from '../content/video.functions';
import { findEntityComments } from '../content/comment.functions';
import { findEntityEmotions } from '../content/emotion.functions';

export const loadMinimalEventPublic = (
  documentModel: DocumentModel,
  publicContent: PublicContent
): EventMinimalDto => {
  const starredImage = validateFindStarredImage(publicContent.images);
  return {
    group: documentModel.group,
    slug: documentModel.slug,
    order: documentModel.order,
    title: validateEntityTitle(documentModel),
    useTileImage: documentModel.useTileImage,
    starredImage,
    starredTileImageDimensions: validateFindImageDimension(
      starredImage.id,
      ImageDimensionType.Tile,
      publicContent.imageDimensions
    ),
  };
};

export const loadEventPublic = (
  documentModel: DocumentModel,
  publicContent: PublicContent
): EventDto => {
  const entityComments = findEntityComments(publicContent.comments);
  const entityEmotions = findEntityEmotions(
    publicContent.emotions,
    publicContent.comments
  );

  return {
    group: documentModel.group,
    slug: documentModel.slug,
    order: documentModel.order,
    title: validateEntityTitle(documentModel),
    description: validateEntityDescription(documentModel),
    keywords: documentModel.keywords,
    dateCreated: validateEntityDateCreated(documentModel),
    location: validateEntityLocation(documentModel),
    text: documentModel.text,
    images: publicContent.images.map(loadMinimalPublicImage),
    videos: publicContent.videos.map(loadMinimalPublicVideo),
    comments: entityComments,
    emotions: entityEmotions,
  };
};

export const updateEventDropbox = (
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
    .filesListFolder({ path: `/websites/events/` })
    .then((response: DropboxListFoldersResponse) => {
      if (response.status !== 200) throw new BadRequestException();
      return response.result.entries;
    })
    .then((folders: DropboxListFoldersItem[]) => {
      createEventEntities(entityModel, folders);
        return folders;
    })
    .then((folders: DropboxListFoldersItem[]) => {
      addEventImages(entityModel, folders);
      return folders;
  });
};

export const createEventEntities = (
  entityModel: Model<DocumentModel>,
  folders: DropboxListFoldersItem[]
): void => {
  return folders
    .filter((folder) => folder['.tag'] === DropboxTag.folder)
    .forEach(async (folder) => {
      const documentModels = await entityModel
        .find({ type: EntityType.Event, slug: folder.name });
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

export const addEventImages = (
  entityModel: Model<DocumentModel>,
  folders: DropboxListFoldersItem[]
): void => {
  Logger.log('add images')
}

