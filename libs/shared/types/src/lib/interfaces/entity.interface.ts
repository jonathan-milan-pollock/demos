import { EntityType } from '../enums/entity-type.enum';
import { WatermarkedType } from '../enums/watermarked-type.enum';
import { About } from './about.interface';
import { BestOf } from './best-of.interface';
import { Destination } from './destination.interface';
import { Event } from './event.interface';
import { Favorites } from './favorites.interface';
import { ImagePost } from './image-post.interface';
import { ImageVideo } from './image-video.interface';
import { PhotoOfTheWeek } from './photo-of-the-week.interface';
import { ReviewMedia } from './review-media.interface';
import { Review } from './review.interface';

export interface Entity
  extends About,
    BestOf,
    Destination,
    Event,
    Favorites,
    ImagePost,
    ImageVideo,
    PhotoOfTheWeek,
    ReviewMedia,
    Review {
  readonly type: EntityType;
  readonly googleDriveFolderId?: string;
  readonly watermarkedType: WatermarkedType;
  readonly isPublished: boolean;
  readonly isProcessing: boolean;
}
