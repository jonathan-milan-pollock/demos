import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// admin
import { AdminTopNavBarComponent } from './admin/admin-top-nav-bar/admin-top-nav-bar.component';
import { NotifyMeFormComponent } from './home/notify-me-form/notify-me-form.component';
import { MasterComponent } from './admin/master/master.component';

// common
import { CloseButtonComponent } from './common/close-button/close-button.component';
import { ContactBarComponent } from './common/contact-bar/contact-bar.component';
import { CopyrightComponent } from './common/copyright/copyright.component';
import { EmailAddressComponent } from './common/email-address/email-address.component';
import { HyperlinkComponent } from './common/hyperlink/hyperlink.component';
import { IconTileComponent } from './common/icon-tile/icon-tile.component';
import { ImageComponent } from './common/image/image.component';
import { KabobMenuComponent } from './common/kabob-menu/kabob-menu.component';
import { SocialMediaBarComponent } from './common/social-media-bar/social-media-bar.component';
import { SocialMediaButtonComponent } from './common/social-media-button/social-media-button.component';
import { TextComponent } from './common/text/text.component';
import { TitleComponent } from './common/title/title.component';
import { TitleBarComponent } from './common/title-bar/title-bar.component';
import { TitleBarBackButtonComponent } from './common/title-bar-back-button/title-bar-back-button.component';
import { TopNavBarComponent } from './common/top-nav-bar/top-nav-bar.component';
import { TopTabBarComponent } from './common/top-tab-bar/top-tab-bar.component';

// directives
import { ThemeDirective } from './directives/theme/theme.directive';

// home
import { EventGridGalleryComponent } from './home/event-grid-gallery/event-grid-gallery.component';
import { EventGridGalleryImageComponent } from './home/event-grid-gallery-image/event-grid-gallery-image.component';
import { EventMasterComponent } from './home/event-master/event-master.component';
import { FavoritesComponent } from './home/favorites/favorites.component';
import { PhotoOfTheWeekDetailComponent } from './home/photo-of-the-week-detail/photo-of-the-week-detail.component';
import { PhotoOfTheWeekMasterComponent } from './home/photo-of-the-week-master/photo-of-the-week-master.component';
import { ReviewDetailComponent } from './home/review-detail/review-detail.component';
import { ReviewMasterComponent } from './home/review-master/review-master.component';
import { ReviewsDetailComponent } from './home/reviews-detail/reviews-detail.component';
import { ReviewsMasterComponent } from './home/reviews-master/reviews-master.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatProgressBarModule,
  ],
  declarations: [
    // admin
    AdminTopNavBarComponent,
    NotifyMeFormComponent,
    MasterComponent,
    // common
    CloseButtonComponent,
    ContactBarComponent,
    CopyrightComponent,
    EmailAddressComponent,
    HyperlinkComponent,
    IconTileComponent,
    ImageComponent,
    KabobMenuComponent,
    SocialMediaBarComponent,
    SocialMediaButtonComponent,
    TextComponent,
    TitleComponent,
    TitleBarComponent,
    TitleBarBackButtonComponent,
    TopNavBarComponent,
    TopTabBarComponent,
    // directives
    ThemeDirective,
    // home
    EventGridGalleryComponent,
    EventGridGalleryImageComponent,
    EventMasterComponent,
    FavoritesComponent,
    PhotoOfTheWeekDetailComponent,
    PhotoOfTheWeekMasterComponent,
    ReviewDetailComponent,
    ReviewMasterComponent,
    ReviewsDetailComponent,
    ReviewsMasterComponent,
  ],
  exports: [
    // admin
    AdminTopNavBarComponent,
    NotifyMeFormComponent,
    MasterComponent,
    // common
    CloseButtonComponent,
    ContactBarComponent,
    CopyrightComponent,
    EmailAddressComponent,
    HyperlinkComponent,
    IconTileComponent,
    ImageComponent,
    KabobMenuComponent,
    SocialMediaBarComponent,
    SocialMediaButtonComponent,
    TextComponent,
    TitleComponent,
    TitleBarComponent,
    TitleBarBackButtonComponent,
    TopNavBarComponent,
    TopTabBarComponent,
    // directives
    ThemeDirective,
    // home
    EventGridGalleryComponent,
    EventGridGalleryImageComponent,
    EventMasterComponent,
    FavoritesComponent,
    PhotoOfTheWeekDetailComponent,
    PhotoOfTheWeekMasterComponent,
    ReviewDetailComponent,
    ReviewMasterComponent,
    ReviewsDetailComponent,
    ReviewsMasterComponent,
  ],
})
export class WebsiteUiModule {}
