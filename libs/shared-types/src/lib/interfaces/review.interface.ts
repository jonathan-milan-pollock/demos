import { Metadata } from './metadata.interface';

export interface Review {
  readonly identifier: {
    readonly slug: string;
  };
  readonly meta: Metadata;
  readonly content: {
    readonly imageSrcPath?: string;
  };
}
