import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';

import { AboutDetailComponent } from './about-detail/about-detail.component';
import { AboutMasterComponent } from './about-master/about-master.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventGalleryComponent } from './event-gallery/event-gallery.component';
import { EventGridGalleryComponent } from './event-grid-gallery/event-grid-gallery.component';
import { EventGridGalleryImageComponent } from './event-grid-gallery-image/event-grid-gallery-image.component';
import { EventMasterComponent } from './event-master/event-master.component';
import { HomeImagesComponent } from './home-images/home-images.component';
import { KabobMenuComponent } from './kabob-menu/kabob-menu.component';
import { PhotoOfTheWeekDetailComponent } from './photo-of-the-week-detail/photo-of-the-week-detail.component';
import { PhotoOfTheWeekMasterComponent } from './photo-of-the-week-master/photo-of-the-week-master.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { ReviewMasterComponent } from './review-master/review-master.component';
import { ReviewsDetailComponent } from './reviews-detail/reviews-detail.component';
import { ReviewsMasterComponent } from './reviews-master/reviews-master.component';
import { SocialMediaBarComponent } from './social-media-bar/social-media-bar.component';
import { SocialMediaButtonComponent } from './social-media-button/social-media-button.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { TitleBarBackButtonComponent } from './title-bar-back-button/title-bar-back-button.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { TopTabBarComponent } from './top-tab-bar/top-tab-bar.component';
import { WebsiteUiUiCommonModule } from '@dark-rush-photography/website/ui/ui-common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    WebsiteUiUiCommonModule,
  ],
  declarations: [
    AboutDetailComponent,
    AboutMasterComponent,
    EventDetailComponent,
    EventGalleryComponent,
    EventGridGalleryComponent,
    EventGridGalleryImageComponent,
    EventMasterComponent,
    HomeImagesComponent,
    KabobMenuComponent,
    PhotoOfTheWeekDetailComponent,
    PhotoOfTheWeekMasterComponent,
    ReviewDetailComponent,
    ReviewMasterComponent,
    ReviewsDetailComponent,
    ReviewsMasterComponent,
    SocialMediaBarComponent,
    SocialMediaButtonComponent,
    TitleBarComponent,
    TitleBarBackButtonComponent,
    TopNavBarComponent,
    TopTabBarComponent,
  ],
  exports: [
    AboutDetailComponent,
    AboutMasterComponent,
    EventDetailComponent,
    EventGalleryComponent,
    EventGridGalleryComponent,
    EventGridGalleryImageComponent,
    EventMasterComponent,
    HomeImagesComponent,
    KabobMenuComponent,
    PhotoOfTheWeekDetailComponent,
    PhotoOfTheWeekMasterComponent,
    ReviewDetailComponent,
    ReviewMasterComponent,
    ReviewsDetailComponent,
    ReviewsMasterComponent,
    SocialMediaBarComponent,
    SocialMediaButtonComponent,
    TitleBarComponent,
    TitleBarBackButtonComponent,
    TopNavBarComponent,
    TopTabBarComponent,
  ],
})
export class WebsiteUiUiHomeModule {
  constructor() {
    config.autoAddCss = false;
  }
}
