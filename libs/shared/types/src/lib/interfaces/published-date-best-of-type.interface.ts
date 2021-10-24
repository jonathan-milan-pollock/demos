import { BestOfType } from '../enums/best-of-type.enum';

export interface PublishedDateBestOfType {
  readonly publishedDate?: string;
  readonly bestOfType: BestOfType;
}
