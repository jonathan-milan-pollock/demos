import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';

import { ProgressiveImageComponent } from './progressive-image/progressive-image.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule],
  declarations: [ProgressiveImageComponent],
  entryComponents: [ProgressiveImageComponent],
  exports: [ProgressiveImageComponent],
})
export class ElementsUiProgressiveImageModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    customElements.define(
      'progressive-image',
      createCustomElement(ProgressiveImageComponent, {
        injector: this.injector,
      })
    );
  }
}
