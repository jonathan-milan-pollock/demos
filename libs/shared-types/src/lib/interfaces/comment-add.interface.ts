import { User } from './user.interface';

export interface CommentAdd {
  readonly user: User;
  readonly text: string;
}
