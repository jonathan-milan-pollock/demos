import { ReadableDate } from '@dark-rush-photography/shared-types';
import { Metadata } from './metadata.interface';

export interface DocumentMetadata extends Metadata {
  readonly keywords: ReadonlySet<string>;
  readonly dateCreated?: ReadableDate;
  readonly datePublished?: ReadableDate;
}
