export interface SharedPhotoAlbum {
  readonly id: string;
  readonly name: string;
  readonly lowResDataUri: string;
  readonly highResDataUri: string;
  readonly imagesCount: number;
}
