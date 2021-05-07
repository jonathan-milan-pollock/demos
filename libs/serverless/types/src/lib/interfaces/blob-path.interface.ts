import { Publish } from '../enums/publish.enum';

export interface BlobPath {
  readonly publish: Publish;
  readonly publishedCollectionSetParentName?: string;
  readonly publishedCollectionSetName?: string;
  readonly publishedCollectionName?: string;
  readonly imageType?: string;
  readonly fileName?: string;
}
