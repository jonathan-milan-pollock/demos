import { Component, ViewEncapsulation } from '@angular/core';

interface DrpGridGalleryImage {
  thumbnailSrc: string;
  imageSrc: string;
  width: number;
  height: number;
}

type DrpGridGalleryImageType = 'Zoom' | 'Select' | 'Favorite';

@Component({
  selector: 'drp-image-grid-gallery',
  templateUrl: './image-grid-gallery.component.html',
  styleUrls: ['./image-grid-gallery.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ImageGridGalleryComponent {}
