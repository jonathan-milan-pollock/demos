export interface Review {
  readonly id: string;
  readonly name: string;
  readonly text: ReadonlyArray<string>;
  readonly imageSrcPath?: string;
}
