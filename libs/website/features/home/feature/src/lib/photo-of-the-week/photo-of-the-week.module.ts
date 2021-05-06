import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PhotoOfTheWeekComponent } from './photo-of-the-week.component';

@NgModule({
  declarations: [PhotoOfTheWeekComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: PhotoOfTheWeekComponent },
    ]),
  ],
})
export class PhotoOfTheWeekModule {}
