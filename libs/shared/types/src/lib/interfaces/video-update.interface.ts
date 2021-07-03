export interface VideoUpdate {
  readonly fileName: string;
  readonly order: number;
  readonly isStared: boolean;
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: string;
  readonly dateCreated: string;
  readonly datePublished?: string;
  readonly coverImageId?: string;
  readonly hlsStreamingUrl?: string;
  readonly isFlyOver: boolean;
}
