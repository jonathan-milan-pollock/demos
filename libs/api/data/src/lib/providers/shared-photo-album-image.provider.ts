import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
import { getGoogleDriveFolderWithName$ } from '@dark-rush-photography/api/util';

import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { SharedPhotoAlbumProvider } from './shared-photo-album.provider';

@Injectable()
export class SharedPhotoAlbumImageProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly sharedPhotoAlbumProvider: SharedPhotoAlbumProvider
  ) {}

  findNewImagesFolder$(
    googleDrive: drive_v3.Drive,
    entityId: string
  ): Observable<{
    documentModel: DocumentModel;
    imagesFolder: GoogleDriveFolder;
  }> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        combineLatest([
          of(documentModel),
          this.sharedPhotoAlbumProvider.findSharedWithFolder$(
            googleDrive,
            documentModel.watermarkedType,
            documentModel.group
          ),
        ])
      ),
      concatMap(([documentModel, socialMediaGroupFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            socialMediaGroupFolder.id,
            documentModel.slug
          ),
        ])
      ),
      concatMap(([documentModel, socialMediaEntityFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            socialMediaEntityFolder.id,
            'images'
          ),
        ])
      ),
      map(([documentModel, entityImagesFolder]) => {
        return {
          documentModel: documentModel,
          imagesFolder: entityImagesFolder,
        };
      })
    );
  }
}
