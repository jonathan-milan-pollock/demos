import {
  BestOfChildren,
  DocumentType,
  ReadableDate,
} from '@dark-rush-photography/shared-types';

export class BestOfChildrenDto implements BestOfChildren {
  id = '';
  type: DocumentType = 'BestOfChildren';
  slug = '';
  title = '';
  description = '';
  keywords = [];
  dateCreated?: ReadableDate;
  datePublished?: ReadableDate;
  images = [];
  threeSixtyImages = [];
  videos = [];
}
