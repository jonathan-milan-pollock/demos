import { ThreeSixtyImageOrientation } from './three-sixty-image-orientation.interface';

export interface ThreeSixtyImage {
  srcPath: string;
  extraSmallOrientation: ThreeSixtyImageOrientation;
  smallOrientation: ThreeSixtyImageOrientation;
  mediumOrientation: ThreeSixtyImageOrientation;
  largeOrientation: ThreeSixtyImageOrientation;
}
