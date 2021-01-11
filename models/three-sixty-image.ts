import ThreeSixtyImageOrientation from './three-sixty-image-orientation';

export default interface ThreeSixtyImage {
  fileName: string;
  extraSmallUrl: string;
  smallOrientation: ThreeSixtyImageOrientation;
  mediumOrientation: ThreeSixtyImageOrientation;
  largeOrientation: ThreeSixtyImageOrientation;
}
