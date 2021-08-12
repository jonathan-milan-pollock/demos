import { DropboxTemporaryLinkResult } from "./dropbox-temporary-link-result.interface";

export interface DropboxTemporaryLinkResponse {
  readonly status: number;
  readonly result: DropboxTemporaryLinkResult;
}
