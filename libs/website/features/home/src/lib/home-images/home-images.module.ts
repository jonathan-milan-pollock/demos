import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeImagesComponent } from './home-images.component';

@NgModule({
  declarations: [HomeImagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeImagesComponent },
    ]),
  ],
})
export class HomeImagesModule {}
