import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { PopupComponent } from './popup.component';
import { ImageSlideGalleryComponent } from './image-slide-gallery/image-slide-gallery.component';
import { ImageGridGalleryComponent } from './image-grid-gallery/image-grid-gallery.component';
import { ProgressiveImageComponent } from './progressive-image/progressive-image.component';
import { TiltShiftImageComponent } from './tilt-shift-image/tilt-shift-image.component';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [PopupComponent, ImageSlideGalleryComponent, ImageGridGalleryComponent, ProgressiveImageComponent, TiltShiftImageComponent],
  entryComponents: [PopupComponent],
  exports: [PopupComponent],
})
export class ImageCustomElementsUiModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const customElement = createCustomElement(PopupComponent, {
      injector: this.injector,
    });

    customElements.define(`dark-rush-photography-popup`, customElement);
  }
}
