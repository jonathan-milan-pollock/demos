import { User } from './user.interface';

export interface Comment {
  readonly id: string;
  readonly entityId: string;
  readonly imageId?: string;
  readonly order: number;
  readonly user: User;
  readonly text: string;
}
