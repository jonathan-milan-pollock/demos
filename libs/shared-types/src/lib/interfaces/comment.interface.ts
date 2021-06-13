export interface Comment {
  readonly id: string;
  readonly entityId: string;
  readonly mediaSlug?: string;
  readonly order: number;
  readonly userName: string;
  readonly userImage: string;
  readonly text: string;
}
