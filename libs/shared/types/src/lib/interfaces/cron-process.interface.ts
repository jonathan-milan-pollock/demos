export interface CronProcess {
  readonly key: string;
  readonly type: string;
  readonly entityType: string;
  readonly entityId: string;
  readonly group: string;
  readonly slug: string;
  readonly postSocialMedia: boolean;
  readonly ready: boolean;
  readonly running: boolean;
  readonly completed: boolean;
  readonly error: boolean;
}
