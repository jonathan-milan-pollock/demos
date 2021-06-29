import { Activity } from './activity.interface';

export interface ActivityGroup {
  readonly sequential: Activity[];
  readonly parallel: Activity[];
}
