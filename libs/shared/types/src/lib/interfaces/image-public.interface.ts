import { Resolution } from './resolution.interface';

export interface ImagePublic {
  readonly fileName: string;
  readonly storageId: string;
  readonly order: number;
  readonly title: string;
  readonly seoDescription: string;
  readonly seoKeywords: string[];
  readonly dateCreated: string;
  readonly datePublished: string;
  readonly smallResolution: Resolution;
  readonly isThreeSixty: boolean;
}
