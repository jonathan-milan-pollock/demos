import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteUiModule } from '@dark-rush-photography/website/ui';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, WebsiteUiModule],
  declarations: [HomeComponent],
})
export class WebsiteFeatureModule {}
