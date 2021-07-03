export interface ImageUpdate {
  readonly fileName: string;
  readonly order: number;
  readonly isStared: boolean;
  readonly isLoved: boolean;
  readonly isLiked: boolean;
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: string;
  readonly dateCreated: string;
  readonly datePublished?: string;
}
