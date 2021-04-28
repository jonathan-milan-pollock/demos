import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavBarButtonComponent } from './nav-bar-button/nav-bar-button.component';
import { SocialMediaBarComponent } from './social-media-bar/social-media-bar.component';
import { ThemeToggleButtonComponent } from './theme-toggle-button/theme-toggle-button.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { TitleBarBackButtonComponent } from './title-bar-back-button/title-bar-back-button.component';
import { TitleBarKabobMenuComponent } from './title-bar-kabob-menu/title-bar-kabob-menu.component';
import { TitleBarKabobMenuItemComponent } from './title-bar-kabob-menu-item/title-bar-kabob-menu-item.component';
import { WebsiteUiUiDirectivesModule } from '@dark-rush-photography/website/ui/ui-directives';
import { SocialMediaButtonComponent } from './social-media-button/social-media-button.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    FontAwesomeModule,
    WebsiteUiUiDirectivesModule,
  ],
  declarations: [
    HeaderComponent,
    NavComponent,
    NavBarComponent,
    NavBarButtonComponent,
    SocialMediaBarComponent,
    SocialMediaButtonComponent,
    ThemeToggleButtonComponent,
    TitleBarComponent,
    TitleBarBackButtonComponent,
    TitleBarKabobMenuComponent,
    TitleBarKabobMenuItemComponent,
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    NavBarComponent,
    NavBarButtonComponent,
    SocialMediaBarComponent,
    SocialMediaButtonComponent,
    ThemeToggleButtonComponent,
    TitleBarComponent,
    TitleBarBackButtonComponent,
    TitleBarKabobMenuComponent,
    TitleBarKabobMenuItemComponent,
  ],
})
export class WebsiteUiUiShellModule {}
