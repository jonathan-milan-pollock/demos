import { PublishServiceType } from '../enums/publish-service.type';

export interface PublishedImage {
  readonly publishServiceType: PublishServiceType;
  readonly publishedCollectionSetParentName?: string;
  readonly publishedCollectionSetName?: string;
  readonly publishedCollectionName?: string;
  readonly imageName: string;
}
