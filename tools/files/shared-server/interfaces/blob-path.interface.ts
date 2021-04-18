import { PublishType } from '../types/publish-type';

export interface BlobPath {
  readonly publishType: PublishType;
  readonly publishedCollectionSetParentName?: string;
  readonly publishedCollectionSetName?: string;
  readonly publishedCollectionName?: string;
  readonly imageType?: string;
  readonly fileName?: string;
}
