import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { WebsiteUiUiHomeModule } from '@dark-rush-photography/website/ui/ui-home';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AboutComponent },
    ]),
    WebsiteUiUiHomeModule,
  ],
})
export class AboutModule {}
