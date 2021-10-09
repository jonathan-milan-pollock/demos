export interface ImageUpdate {
  readonly order: number;
  readonly isStarred: boolean;
  readonly isLoved: boolean;
  readonly title?: string;
  readonly seoDescription?: string;
  readonly seoKeywords: string[];
}
