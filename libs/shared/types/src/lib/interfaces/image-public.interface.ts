import { Resolution } from './resolution.interface';

export interface ImagePublic {
  readonly storageId: string;
  readonly fileName: string;
  readonly isThreeSixty: boolean;
  readonly order: number;
  readonly smallResolution: Resolution;
}
