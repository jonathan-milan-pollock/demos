import { PostState } from '@dark-rush-photography/shared-types';
import { ActivityType } from '../enums/activity-type.enum';
import { ActivityMedia } from './activity-media.interface';
import { ActivityConfig } from './activity-config.interface';
import { ActivityOrchestratorType } from '../enums/activity-orchestrator-type.enum';

export interface Activity {
  readonly type: ActivityType;
  readonly orchestratorType: ActivityOrchestratorType;
  readonly postState: PostState;
  readonly media: ActivityMedia;
  readonly config?: ActivityConfig;
}
