export interface Task {
  readonly id: string;
  readonly title: string;
  readonly state: 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED';
  readonly updatedAt: Date;
}
