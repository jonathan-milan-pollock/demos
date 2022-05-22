import ThreeSixtyImageOrientation from './three-sixty-image-orientation.interface';

export default interface ThreeSixtyImage {
  readonly fileName: string;
  readonly extraSmallUrl: string;
  readonly smallOrientation: ThreeSixtyImageOrientation;
  readonly mediumOrientation: ThreeSixtyImageOrientation;
  readonly largeOrientation: ThreeSixtyImageOrientation;
}
