import { EmotionType } from '../enums/emotion-type.enum';
import { User } from './user.interface';

export interface EmotionAdd {
  readonly entityId: string;
  readonly mediaId?: string;
  readonly commentId?: string;
  readonly type: EmotionType;
  readonly user: User;
}
