import { DropboxListFoldersItem } from './dropbox-list-folders-item.interface';

export interface DropboxListFoldersResult {
  readonly entries: DropboxListFoldersItem[];
  readonly has_more: boolean;
}
