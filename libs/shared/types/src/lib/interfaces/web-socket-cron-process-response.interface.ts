export interface WebSocketCronProcessResponse {
  readonly key: string;
  readonly type: string;
  readonly entityId: string;
  readonly ready: boolean;
  readonly running: boolean;
  readonly completed: boolean;
  readonly error: boolean;
}
