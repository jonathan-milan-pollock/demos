import { DropboxUserAccountResult } from "./dropbox-user-account-result.interface";

export interface DropboxUserAccountResponse {
  readonly status: number;
  readonly result: DropboxUserAccountResult;
}
