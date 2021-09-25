import { BadRequestException, Injectable } from '@nestjs/common';

import { concatMap, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';
import { v4 as uuidv4 } from 'uuid';

import { EntityType, Image} from '@dark-rush-photography/shared/types';
import { ImageLoadNewProvider } from './image-process-new.provider';
import { AboutProvider } from './about.provider';
import { BestOfProvider } from './best-of.provider';
import { DestinationProvider } from './destination.provider';
import { EventProvider } from './event.provider';
import { FavoritesProvider } from './favorites.provider';
import { PhotoOfTheWeekProvider } from './photo-of-the-week.provider';
import { ReviewMediaProvider } from './review-media.provider';
import { ReviewProvider } from './review.provider';
import { SharedPhotoAlbumLoadProvider } from './shared-photo-album-load.provider';
import { SocialMediaProvider } from './social-media.provider';

@Injectable()
export class ImageFolderProvider {
  constructor(
    private readonly aboutProvider: AboutProvider,
    private readonly bestOfProvider: BestOfProvider,
    private readonly destinationProvider: DestinationProvider,
    private readonly eventProvider: EventProvider,
    private readonly favoritesProvider: FavoritesProvider,
    private readonly photoOfTheWeekProvider: PhotoOfTheWeekProvider,
    private readonly reviewMediaProvider: ReviewMediaProvider,
    private readonly reviewProvider: ReviewProvider,
    private readonly sharedPhotoAlbumLoadProvider: SharedPhotoAlbumLoadProvider,
    private readonly socialMediaProvider: SocialMediaProvider,
    private readonly imageLoadNewProvider: ImageLoadNewProvider
  ) {}

  loadClonedImage(fromImage: Image): Image {

  clone$(
    id: string,
    entityId: string
  ): Observable<Image> {
    const newId = uuidv4();
   return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => combineLatest([of(documentModel), this.findOne$(id, entityId)])),
      concatMap(([documentModel, image]) => {



        from(
          this.entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...documentModel.images,
              {
                id: newId,
                entityId,
                state: image.state,
                blobPathId: uuidv4(),
                fileName: image.fileName,
                order: image.order,
                isStarred: image.isStarred,
                isLoved: false,
                isThreeSixty,
              },
            ],
          })
        )
      }),
      concatMap(() => this.findOne$(newId, entityId))
    );
  }

    return {
      id: uuidv4(),
      entityId: fromImage.entityId,
      state: fromImage.state,
      blobPathId: uuidv4(),
      fileName: fromImage.fileName,
      order: fromImage.order,
      isStarred: fromImage.isStarred,
      isLoved: fromImage.isLoved,
      title: fromImage.title,
      seoDescription: fromImage.seoDescription,
      seoKeywords: fromImage.seoKeywords,
      dateCreated: fromImage.dateCreated,
      datePublished: fromImage.datePublished,
      isThreeSixty: fromImage.isThreeSixty,
    }
  } ;
}
