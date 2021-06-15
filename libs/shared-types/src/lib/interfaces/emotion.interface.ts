import { EmotionType } from '../enums/emotion-type.enum';
import { User } from './user.interface';

export interface Emotion {
  readonly entityId: string;
  readonly mediaSlug?: string;
  readonly commentId?: string;
  readonly type: EmotionType;
  readonly user: User;
}
