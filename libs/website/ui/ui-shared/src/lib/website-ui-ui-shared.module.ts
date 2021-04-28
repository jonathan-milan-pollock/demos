import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CloseButtonComponent } from './close-button/close-button.component';
import { DownloadImageButtonComponent } from './download-image-button/download-image-button.component';
import { OptionsBarComponent } from './options-bar/options-bar.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, FontAwesomeModule],
  declarations: [
    CloseButtonComponent,
    DownloadImageButtonComponent,
    OptionsBarComponent,
  ],
  exports: [
    CloseButtonComponent,
    DownloadImageButtonComponent,
    OptionsBarComponent,
  ],
})
export class WebsiteUiUiSharedModule {}
