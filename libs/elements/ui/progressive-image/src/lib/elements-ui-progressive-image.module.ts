import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';

import { ProgressiveImageComponent } from './progressive-image/progressive-image.component';
//import { ViewportService } from '@dark-rush-photography/elements/util';

@NgModule({
  imports: [CommonModule],
  declarations: [ProgressiveImageComponent],
  entryComponents: [ProgressiveImageComponent],
  exports: [ProgressiveImageComponent],
  //  providers: [ViewportService],
})
export class ElementsUiProgressiveImageModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    customElements.define(
      `progressive-image`,
      createCustomElement(ProgressiveImageComponent, {
        injector: this.injector,
      })
    );
  }
}
