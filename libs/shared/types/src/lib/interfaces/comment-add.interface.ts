import { User } from './user.interface';

export interface CommentAdd {
  readonly entityId: string;
  readonly mediaId?: string;
  readonly user: User;
  readonly text: string;
}
