import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';

import { ImageGridGalleryComponent } from './image-grid-gallery/image-grid-gallery.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ImageGridGalleryComponent],
  entryComponents: [ImageGridGalleryComponent],
  exports: [ImageGridGalleryComponent],
})
export class ElementsUiImageGridGalleryModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    customElements.define(
      `drp-image-grid-gallery`,
      createCustomElement(ImageGridGalleryComponent, {
        injector: this.injector,
      })
    );
  }
}
