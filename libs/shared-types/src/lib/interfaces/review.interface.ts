export interface Review {
  readonly slug: string;
  readonly name: string;
  readonly text: string[];
  readonly imageSrcPath?: string;
}
