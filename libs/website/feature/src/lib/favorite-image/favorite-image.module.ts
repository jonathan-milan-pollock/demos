import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FavoriteImageComponent } from './favorite-image.component';

@NgModule({
  declarations: [FavoriteImageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: FavoriteImageComponent },
    ]),
  ],
})
export class FavoriteImageModule {}
