import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { WebsiteUiUiAdminModule } from '@dark-rush-photography/website/ui/ui-admin';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, WebsiteUiUiAdminModule],
})
export class WebsiteFeaturesAdminModule {}
