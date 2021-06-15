import { User } from './user.interface';

export interface Comment {
  readonly entityId: string;
  readonly mediaSlug?: string;
  readonly id: string;
  readonly order: number;
  readonly user: User;
  readonly text: string;
}
