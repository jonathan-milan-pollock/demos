import { ThreeSixtyImageOrientation } from './three-sixty-image-orientation.interface';

export interface ThreeSixtyImage {
  fileName: string;
  extraSmallUrl: string;
  smallOrientation: ThreeSixtyImageOrientation;
  mediumOrientation: ThreeSixtyImageOrientation;
  largeOrientation: ThreeSixtyImageOrientation;
}
