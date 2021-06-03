import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';

import { ImageSlideGalleryComponent } from './image-slide-gallery/image-slide-gallery.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ImageSlideGalleryComponent],
  entryComponents: [ImageSlideGalleryComponent],
  exports: [ImageSlideGalleryComponent],
})
export class ElementsUiImageSlideGalleryModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    customElements.define(
      `drp-image-slide-gallery`,
      createCustomElement(ImageSlideGalleryComponent, {
        injector: this.injector,
      })
    );
  }
}
