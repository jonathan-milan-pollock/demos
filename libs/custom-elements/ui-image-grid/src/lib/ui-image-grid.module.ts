import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { PopupComponent } from './popup.component';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [PopupComponent],
  entryComponents: [PopupComponent],
  exports: [PopupComponent],
})
export class UiImageGridModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const customElement = createCustomElement(PopupComponent, {
      injector: this.injector,
    });

    customElements.define(`dark-rush-photography-popup`, customElement);
  }
}
