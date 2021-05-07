import { ThreeSixtyImageType } from '../types/three-sixty-image.type';

export interface ThreeSixtyImage {
  readonly type: ThreeSixtyImageType;
  readonly srcPath: string;
  readonly pitch: number;
  readonly yaw: number;
  readonly hfov: number;
}
