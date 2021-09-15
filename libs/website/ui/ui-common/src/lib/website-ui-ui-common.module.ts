import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CloseButtonComponent } from './close-button/close-button.component';
import { DownloadImageButtonComponent } from './download-image-button/download-image-button.component';
import { EmailAddressComponent } from './email-address/email-address.component';
import { HyperlinkComponent } from './hyperlink/hyperlink.component';
import { ImageComponent } from './image/image.component';
import { OptionsBarComponent } from './options-bar/options-bar.component';
import { TextComponent } from './text/text.component';
import { TitleComponent } from './title/title.component';
import { IconTileComponent } from './icon-tile/icon-tile.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressBarModule,
    FontAwesomeModule,
  ],
  declarations: [
    CloseButtonComponent,
    DownloadImageButtonComponent,
    EmailAddressComponent,
    HyperlinkComponent,
    ImageComponent,
    OptionsBarComponent,
    TextComponent,
    TitleComponent,
    IconTileComponent,
  ],
  exports: [
    CloseButtonComponent,
    DownloadImageButtonComponent,
    EmailAddressComponent,
    HyperlinkComponent,
    ImageComponent,
    OptionsBarComponent,
    TextComponent,
    TitleComponent,
    IconTileComponent,
  ],
})
export class WebsiteUiUiCommonModule {}
