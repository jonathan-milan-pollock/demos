import { Resolution } from './resolution.interface';

export interface ImagePublic {
  readonly storageId: string;
  readonly fileName: string;
  readonly order: number;
  readonly title: string;
  readonly seoDescription: string;
  readonly seoKeywords: string[];
  readonly dateCreated: string;
  readonly datePublished: string;
  readonly smallResolution: Resolution;
  readonly isThreeSixty: boolean;
}
