import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { ImageSlideGalleryComponent } from './image-slide-gallery/image-slide-gallery.component';
import { ImageGridGalleryComponent } from './image-grid-gallery/image-grid-gallery.component';
import { ProgressiveImageComponent } from './progressive-image/progressive-image.component';
import { TiltShiftImageComponent } from './tilt-shift-image/tilt-shift-image.component';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [
    ImageSlideGalleryComponent,
    ImageGridGalleryComponent,
    ProgressiveImageComponent,
    TiltShiftImageComponent,
  ],
  entryComponents: [
    ImageSlideGalleryComponent,
    ImageGridGalleryComponent,
    ProgressiveImageComponent,
    TiltShiftImageComponent,
  ],
  exports: [
    ImageSlideGalleryComponent,
    ImageGridGalleryComponent,
    ProgressiveImageComponent,
    TiltShiftImageComponent,
  ],
})
export class ElementsUiModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    customElements.define(
      `drp-image-grid-gallery`,
      createCustomElement(ImageGridGalleryComponent, {
        injector: this.injector,
      })
    );

    customElements.define(
      `drp-image-slide-gallery`,
      createCustomElement(ImageSlideGalleryComponent, {
        injector: this.injector,
      })
    );

    customElements.define(
      `drp-progressive-image`,
      createCustomElement(ProgressiveImageComponent, {
        injector: this.injector,
      })
    );

    customElements.define(
      `drp-tilt-shift-image`,
      createCustomElement(TiltShiftImageComponent, {
        injector: this.injector,
      })
    );
  }
}
