export interface ImageGallery {
  pause(): void;
  getCurrentIndex(): number;
  slideToIndex(imageIndex: number): void;
}
