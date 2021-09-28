import { EmotionType } from '../enums/emotion-type.enum';
import { User } from './user.interface';

export interface Emotion {
  readonly id: string;
  readonly entityId: string;
  readonly imageId?: string;
  readonly commentId?: string;
  readonly type: EmotionType;
  readonly user: User;
}
