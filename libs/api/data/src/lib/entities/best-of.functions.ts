/* eslint-disable @typescript-eslint/no-var-requires */
import { BadRequestException, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;

import { BestOfDto, EntityType } from '@dark-rush-photography/shared/types';
import {
  DEFAULT_ENTITY_GROUP,
  DropboxListFoldersItem,
  DropboxListFoldersResponse,
  DropboxTag,
  PublicContent,
} from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { loadNewEntity } from '../entities/entity.functions';
import { loadMinimalPublicImage } from '../content/image.functions';

export const loadBestOfPublic = (publicContent: PublicContent): BestOfDto => ({
  images: publicContent.images.map(loadMinimalPublicImage),
});

export const updateBestOfDropbox = (
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
    .filesListFolder({ path: `/websites/best-of/` })
    .then((response: DropboxListFoldersResponse) => {
      if (response.status !== 200) throw new BadRequestException();
      return response.result.entries;
    })
    .then((folders: DropboxListFoldersItem[]) => {
      createBestOfEntities(entityModel, folders);
        return folders;
    })
    .then((folders: DropboxListFoldersItem[]) => {
      addBestOfImages(entityModel, folders);
      return folders;
  });
};

export const createBestOfEntities = (
  entityModel: Model<DocumentModel>,
  folders: DropboxListFoldersItem[]
): void => {
  return folders
    .filter((folder) => folder['.tag'] === DropboxTag.folder)
    .forEach(async (folder) => {
      const documentModels = await entityModel
        .find({ type: EntityType.BestOf, slug: folder.name });
      if (documentModels.length == 0) {
        new entityModel({
          ...loadNewEntity({
            type: EntityType.BestOf,
            group: DEFAULT_ENTITY_GROUP,
            slug: folder.name,
            isPublic: true,
          }),
        }).save();
      }

      // add images

    });
};

export const addBestOfImages = (
  entityModel: Model<DocumentModel>,
  folders: DropboxListFoldersItem[]
): void => {
  Logger.log('add images')
}
