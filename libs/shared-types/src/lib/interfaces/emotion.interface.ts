import { EmotionType } from '../enums/emotion-type.enum';

export interface Emotion {
  readonly type: EmotionType;
  readonly userName: string;
  readonly userImage: string;
}
