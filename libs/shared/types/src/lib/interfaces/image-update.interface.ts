export interface ImageUpdate {
  readonly threeSixtyImageStorageId?: string;
  readonly isStarred: boolean;
  readonly isLoved: boolean;
  readonly title?: string;
  readonly seoDescription?: string;
  readonly seoKeywords: string[];
}
