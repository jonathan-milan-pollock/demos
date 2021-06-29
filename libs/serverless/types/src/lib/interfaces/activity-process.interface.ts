import { ActivityOrchestratorType } from '../enums/activity-orchestrator-type.enum';
import { ActivityGroup } from './activity-group.interface';

export interface ActivityProcess {
  readonly orchestratorType: ActivityOrchestratorType;
  readonly activityGroups: ActivityGroup[];
}
