import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { WebsiteUiModule } from '@dark-rush-photography/website/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeComponent },
    ]),
    FormsModule,
    WebsiteUiModule,
  ],
  declarations: [HomeComponent],
})
export class WebsiteFeatureHomeModule {}
