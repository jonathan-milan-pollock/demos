export interface Comment {
  readonly entityId: string;
  readonly mediaSlug?: string;
  readonly id: string;
  readonly order: number;
  readonly userName: string;
  readonly userImage: string;
  readonly text: string;
}
