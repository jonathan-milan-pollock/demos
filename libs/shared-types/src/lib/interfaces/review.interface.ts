import { DocumentType } from '../types/document.type';
import { Image } from './image.interface';

export interface Review {
  readonly id: string;
  readonly type: DocumentType;
  readonly title: string;
  readonly text: ReadonlyArray<string>;
  readonly images: ReadonlyArray<Image>;
}
