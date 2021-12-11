import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { WebsiteUiModule } from '@dark-rush-photography/website/ui';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AboutComponent },
    ]),
    WebsiteUiModule,
  ],
})
export class AboutModule {}
