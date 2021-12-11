import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FavoriteThreeSixtyImageComponent } from './favorite-three-sixty-image.component';

@NgModule({
  declarations: [FavoriteThreeSixtyImageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: FavoriteThreeSixtyImageComponent,
      },
    ]),
  ],
})
export class FavoriteThreeSixtyImageModule {}
