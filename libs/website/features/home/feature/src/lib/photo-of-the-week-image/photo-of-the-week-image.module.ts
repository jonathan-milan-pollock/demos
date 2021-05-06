import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PhotoOfTheWeekImageComponent } from './photo-of-the-week-image.component';

@NgModule({
  declarations: [PhotoOfTheWeekImageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: PhotoOfTheWeekImageComponent },
    ]),
  ],
})
export class PhotoOfTheWeekImageModule {}
