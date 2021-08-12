import { EntityType } from "../enums/entity-type.enum";
import { About } from "./about.interface";
import { BestOf } from "./best-of.interface";
import { Destination } from "./destination.interface";
import { Event } from "./event.interface";
import { Favorites } from "./favorites.interface";
import { MediaProcess } from "./media-process.interface";
import { PhotoOfTheWeek } from "./photo-of-the-week.interface";
import { ReviewMedia } from "./review-media.interface";
import { Review } from "./review.interface";
import { SocialMedia } from "./social-media.interface";

export interface Entity
  extends About,
    BestOf,
    Destination,
    Event,
    Favorites,
    MediaProcess,
    PhotoOfTheWeek,
    ReviewMedia,
    Review,
    SocialMedia {
     readonly type: EntityType
    }
