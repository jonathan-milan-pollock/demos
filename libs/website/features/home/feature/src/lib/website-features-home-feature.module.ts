import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  SocialMediaButtonComponent,
  SocialMediaBarComponent,
} from '@dark-rush-photography/website/ui/ui-shared';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    SocialMediaButtonComponent,
    SocialMediaBarComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FontAwesomeModule,
    HomeRoutingModule,
  ],
})
export class WebsiteFeaturesHomeFeatureModule {}
