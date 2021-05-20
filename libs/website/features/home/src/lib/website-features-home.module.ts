import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { WebsiteUiUiHomeModule } from '@dark-rush-photography/website/ui/ui-home';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, WebsiteUiUiHomeModule],
})
export class WebsiteFeaturesHomeModule {}
