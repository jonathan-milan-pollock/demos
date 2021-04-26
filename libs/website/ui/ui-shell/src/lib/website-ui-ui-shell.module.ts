import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { WebsiteUiUiDirectivesModule } from '@dark-rush-photography/website/ui/ui-directives';
import { BottomContactBarComponent } from './bottom-contact-bar/bottom-contact-bar.component';
import { BottomNavBarComponent } from './bottom-nav-bar/bottom-nav-bar.component';
import { BottomNavBarButtonComponent } from './bottom-nav-bar-button/bottom-nav-bar-button.component';
import { BottomSocialMediaBarButtonComponent } from './bottom-social-media-bar-button/bottom-social-media-bar-button.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavBarButtonComponent } from './nav-bar-button/nav-bar-button.component';
import { ThemeToggleButtonComponent } from './theme-toggle-button/theme-toggle-button.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { TitleBarBackButtonComponent } from './title-bar-back-button/title-bar-back-button.component';
import { TitleBarKabobMenuComponent } from './title-bar-kabob-menu/title-bar-kabob-menu.component';
import { TitleBarKabobMenuItemComponent } from './title-bar-kabob-menu-item/title-bar-kabob-menu-item.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, WebsiteUiUiDirectivesModule],
  declarations: [
    BottomContactBarComponent,
    BottomNavBarComponent,
    BottomNavBarButtonComponent,
    BottomSocialMediaBarButtonComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    NavBarComponent,
    NavBarButtonComponent,
    ThemeToggleButtonComponent,
    TitleBarComponent,
    TitleBarBackButtonComponent,
    TitleBarKabobMenuComponent,
    TitleBarKabobMenuItemComponent,
  ],
  exports: [
    BottomContactBarComponent,
    BottomNavBarComponent,
    BottomNavBarButtonComponent,
    BottomSocialMediaBarButtonComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    NavBarComponent,
    NavBarButtonComponent,
    ThemeToggleButtonComponent,
    TitleBarComponent,
    TitleBarBackButtonComponent,
    TitleBarKabobMenuComponent,
    TitleBarKabobMenuItemComponent,
  ],
})
export class WebsiteUiUiShellModule {}
