import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { KabobMenuComponent } from './kabob-menu/kabob-menu.component';
import { SocialMediaBarComponent } from './social-media-bar/social-media-bar.component';
import { SocialMediaButtonComponent } from './social-media-button/social-media-button.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { TitleBarBackButtonComponent } from './title-bar-back-button/title-bar-back-button.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { TopTabBarComponent } from './top-tab-bar/top-tab-bar.component';
import { WebsiteUiUiCommonModule } from '@dark-rush-photography/website/ui/ui-common';
import { ContactBarComponent } from './contact-bar/contact-bar.component';
import { EmailAddressComponent } from './email-address/email-address.component';
import { CopyrightComponent } from './copyright/copyright.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonModule,
    FontAwesomeModule,
    WebsiteUiUiCommonModule,
  ],
  declarations: [
    KabobMenuComponent,
    SocialMediaBarComponent,
    SocialMediaButtonComponent,
    TitleBarComponent,
    TitleBarBackButtonComponent,
    TopNavBarComponent,
    TopTabBarComponent,
    ContactBarComponent,
    EmailAddressComponent,
    CopyrightComponent,
  ],
  exports: [
    KabobMenuComponent,
    SocialMediaBarComponent,
    SocialMediaButtonComponent,
    TitleBarComponent,
    TitleBarBackButtonComponent,
    TopNavBarComponent,
    TopTabBarComponent,
  ],
})
export class WebsiteUiUiShellModule {}
