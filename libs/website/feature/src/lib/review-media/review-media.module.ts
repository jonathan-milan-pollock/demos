import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReviewMediaComponent } from './review-media.component';

@NgModule({
  declarations: [ReviewMediaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ReviewMediaComponent },
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReviewMediaModule {}
