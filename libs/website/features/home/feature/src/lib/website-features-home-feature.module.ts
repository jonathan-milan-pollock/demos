import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { WebsiteUiUiCommonModule } from '@dark-rush-photography/website/ui/ui-common';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FontAwesomeModule,
    HomeRoutingModule,
    WebsiteUiUiCommonModule,
  ],
})
export class WebsiteFeaturesHomeFeatureModule {}
