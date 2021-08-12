import { DropboxListFoldersResult } from './dropbox-list-folders-result.interface';

export interface DropboxListFoldersResponse {
  readonly status: number;
  readonly result: DropboxListFoldersResult;
}
