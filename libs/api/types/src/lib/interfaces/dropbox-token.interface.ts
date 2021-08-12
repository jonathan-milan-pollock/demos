import { DropboxTokenResult } from './dropbox-token-result.interface';

export interface DropboxToken {
  readonly status: number;
  readonly result: DropboxTokenResult;
}
