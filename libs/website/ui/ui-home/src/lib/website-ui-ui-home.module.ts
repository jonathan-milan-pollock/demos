import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AboutDetailComponent } from './about-detail/about-detail.component';
import { AboutMasterComponent } from './about-master/about-master.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventGalleryComponent } from './event-gallery/event-gallery.component';
import { EventGridGalleryComponent } from './event-grid-gallery/event-grid-gallery.component';
import { EventGridGalleryImageComponent } from './event-grid-gallery-image/event-grid-gallery-image.component';
import { EventMasterComponent } from './event-master/event-master.component';
import { HomeImagesComponent } from './home-images/home-images.component';
import { PhotoOfTheWeekDetailComponent } from './photo-of-the-week-detail/photo-of-the-week-detail.component';
import { PhotoOfTheWeekMasterComponent } from './photo-of-the-week-master/photo-of-the-week-master.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { ReviewMasterComponent } from './review-master/review-master.component';
import { ReviewsDetailComponent } from './reviews-detail/reviews-detail.component';
import { ReviewsMasterComponent } from './reviews-master/reviews-master.component';
import { WebsiteUiUiCommonModule } from '@dark-rush-photography/website/ui/ui-common';

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
    AboutDetailComponent,
    AboutMasterComponent,
    EventDetailComponent,
    EventGalleryComponent,
    EventGridGalleryComponent,
    EventGridGalleryImageComponent,
    EventMasterComponent,
    HomeImagesComponent,
    PhotoOfTheWeekDetailComponent,
    PhotoOfTheWeekMasterComponent,
    ReviewDetailComponent,
    ReviewMasterComponent,
    ReviewsDetailComponent,
    ReviewsMasterComponent,
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
    PhotoOfTheWeekDetailComponent,
    PhotoOfTheWeekMasterComponent,
    ReviewDetailComponent,
    ReviewMasterComponent,
    ReviewsDetailComponent,
    ReviewsMasterComponent,
  ],
})
export class WebsiteUiUiHomeModule {}
