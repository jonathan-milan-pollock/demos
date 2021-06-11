import { Emotion } from './emotion.interface';

export interface Comment {
  readonly order: number;
  readonly userName: string;
  readonly userImage: string;
  readonly text: string;
  readonly emotions: ReadonlyArray<Emotion>;
}
