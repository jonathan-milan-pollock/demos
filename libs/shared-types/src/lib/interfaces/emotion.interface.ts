import { EmotionType } from '../enums/emotion-type.enum';

export interface Emotion {
  readonly entityId: string;
  readonly mediaSlug?: string;
  readonly commentId?: string;
  readonly type: EmotionType;
  readonly userName: string;
  readonly userImage: string;
}
