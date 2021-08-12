/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs-extra';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import {
  combineLatest,
  concatMap,
  concatMapTo,
  filter,
  from,
  map,
  mapTo,
  Observable,
  of,
} from 'rxjs';
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;

import {
  DEFAULT_ENTITY_GROUP,
  DropboxListFoldersItem,
  DropboxTag,
  DropboxTemporaryLinkResponse,
} from '@dark-rush-photography/api/types';
import { EntityType, MediaType } from '@dark-rush-photography/shared/types';
import { DocumentModel, Document } from '../schema/document.schema';
import {
  createTempFile$,
  getBlobPath,
  uploadBufferToBlob$,
  uploadStreamToBlob$,
  writeStreamToFile$,
} from '@dark-rush-photography/api/util';
import {
  loadDocumentModelsArray,
  loadNewEntity,
  validateDropboxListFoldersResponse,
} from '../entities/entity.functions';
import { ConfigProvider } from './config.provider';
import { ImageProvider } from './image.provider';
import { ImageUploadProvider } from './image-upload.provider';

@Injectable()
export class AboutProvider {
  readonly logger: Logger;

  constructor(
    private readonly httpService: HttpService,
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProvider: ImageProvider,
    private readonly imageUploadProvider: ImageUploadProvider
  ) {
    this.logger = new Logger(AboutProvider.name);
  }

  update$(ownerRefreshToken: string): Observable<unknown> {
    const dropbox = new Dropbox({
      fetch,
      clientId: this.configProvider.websitesDropboxClientId,
      clientSecret: this.configProvider.websitesDropboxClientSecret,
    });
    dropbox.auth.setRefreshToken(ownerRefreshToken);

    return from(dropbox.filesListFolder({ path: `/websites/about/` })).pipe(
      map(validateDropboxListFoldersResponse),
      concatMap((entries) => from(entries)),
      filter((folder) => folder['.tag'] === DropboxTag.folder),
      concatMap((folder) =>
        combineLatest([
          of(folder),
          from(
            this.entityModel.find({ type: EntityType.About, slug: folder.name })
          ),
        ])
      ),
      concatMap(([folder, documentModels]) => {
        const documentModelsArray = loadDocumentModelsArray(documentModels);
        if (documentModelsArray.length > 0) {
          return combineLatest([of(folder), of(documentModelsArray[0])]);
        }

        return combineLatest([
          of(folder),
          from(
            new this.entityModel({
              ...loadNewEntity({
                type: EntityType.About,
                group: DEFAULT_ENTITY_GROUP,
                slug: folder.name,
                isPublic: true,
              }),
            }).save()
          ),
        ]);
      }),
      concatMap(([folder, documentModel]) =>
        this.addImages$(ownerRefreshToken, folder, documentModel)
      )
    );
  }

  addImages$(
    ownerRefreshToken: string,
    folder: DropboxListFoldersItem,
    documentModel: DocumentModel
  ): Observable<unknown> {
    const dropbox = new Dropbox({
      fetch,
      clientId: this.configProvider.websitesDropboxClientId,
      clientSecret: this.configProvider.websitesDropboxClientSecret,
    });
    dropbox.auth.setRefreshToken(ownerRefreshToken);

    //TODO: Delete all new images for the document model
    return from(
      dropbox.filesListFolder({
        path: `/websites/about/${folder.name}/images`,
      })
    ).pipe(
      map(validateDropboxListFoldersResponse),
      concatMap((dropboxImages) => from(dropboxImages)),
      concatMap((dropboxImage) =>
        combineLatest([
          of(dropboxImage),
          from(
            dropbox.filesGetTemporaryLink({ path: dropboxImage.path_display })
          ),
        ])
      ),
      concatMap(([dropboxImage, response]) => {
        const id = uuidv4();
        return combineLatest([
          of(response),
          this.imageProvider.add$(
            id,
            documentModel._id,
            dropboxImage.name,
            false,
            true,
            this.entityModel
          ),
        ]);
      }),
      map(([response, image]) => ({
        response,
        media: this.imageProvider.loadMedia(
          MediaType.Image,
          image.id,
          image.fileName,
          image.state,
          documentModel
        ),
      })),
      map(({ response, media }) => {
        const temporaryLinkResponse = response as DropboxTemporaryLinkResponse;
        if (temporaryLinkResponse.status !== 200)
          throw new BadRequestException();
        return { link: temporaryLinkResponse.result.link, media };
      }),
      concatMap(({ link, media }) =>
        combineLatest([
          of(media),
          this.httpService.get(link, { responseType: 'stream' }),
        ])
      ),
      concatMap(([media, stream]) =>
        combineLatest([
          of(media),
          writeStreamToFile$(stream.data, media.fileName),
        ])
      ),
      concatMap(([media, filePath]) => {
        const connectionString =
          this.configProvider.getConnectionStringFromMediaState(media.state);
        return combineLatest([
          of(media),
          uploadStreamToBlob$(
            connectionString,
            fs.createReadStream(filePath),
            getBlobPath(media)
          ),
        ]);
      }),
      concatMap(([media]) =>
        this.imageUploadProvider.upload$(media, false, this.entityModel)
      )
    );
  }
}
