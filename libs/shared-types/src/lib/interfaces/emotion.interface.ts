import { EmotionType } from '../enums/emotion-type.enum';

export interface Emotion {
  readonly type: EmotionType;
  readonly entityId: string;
  readonly mediaSlug?: string;
  readonly commentId?: string;
  readonly userName: string;
  readonly userImage: string;
}
