import { DropboxTag } from '../enums/dropbox-tag.enum';

export interface DropboxListFoldersItem {
  readonly id: string;
  readonly '.tag': DropboxTag;
  readonly name: string;
  readonly path_lower: string;
  readonly path_display: string;
}
