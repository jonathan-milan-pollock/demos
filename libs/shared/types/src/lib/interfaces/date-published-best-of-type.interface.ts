import { BestOfType } from '../enums/best-of-type.enum';

export interface DatePublishedBestOfType {
  readonly datePublished?: string;
  readonly bestOfType: BestOfType;
}
