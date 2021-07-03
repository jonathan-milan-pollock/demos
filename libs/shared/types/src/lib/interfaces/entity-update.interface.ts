import { DestinationUpdate } from './destination-update.interface';
import { EventUpdate } from './event-update.interface';
import { PhotoOfTheWeekUpdate } from './photo-of-the-week-update.interface';
import { ReviewUpdate } from './review-update.interface';

export interface EntityUpdate
  extends DestinationUpdate,
    EventUpdate,
    PhotoOfTheWeekUpdate,
    ReviewUpdate {}
