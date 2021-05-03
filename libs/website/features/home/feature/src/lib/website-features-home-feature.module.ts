import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { WebsiteUiCommonModule } from '@dark-rush-photography/website/ui/ui-shared';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FontAwesomeModule,
    HomeRoutingModule,
    WebsiteUiCommonModule,
  ],
})
export class WebsiteFeaturesHomeFeatureModule {}
