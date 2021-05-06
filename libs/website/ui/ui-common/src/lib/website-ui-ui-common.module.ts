import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CloseButtonComponent } from './close-button/close-button.component';
import { DownloadImageButtonComponent } from './download-image-button/download-image-button.component';
import { OptionsBarComponent } from './options-bar/options-bar.component';
import { SocialMediaBarComponent } from './social-media-bar/social-media-bar.component';
import { SocialMediaButtonComponent } from './social-media-button/social-media-button.component';
import { VideoComponent } from './video/video.component';
import { ImageComponent } from './image/image.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MeterComponent } from './meter/meter.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressBarModule,
    FontAwesomeModule,
  ],
  declarations: [
    CloseButtonComponent,
    DownloadImageButtonComponent,
    OptionsBarComponent,
    SocialMediaBarComponent,
    SocialMediaButtonComponent,
    VideoComponent,
    ImageComponent,
    ToolbarComponent,
    MeterComponent,
  ],
  exports: [
    CloseButtonComponent,
    DownloadImageButtonComponent,
    OptionsBarComponent,
    SocialMediaBarComponent,
    SocialMediaButtonComponent,
    MeterComponent,
  ],
})
export class WebsiteUiUiCommonModule {}
