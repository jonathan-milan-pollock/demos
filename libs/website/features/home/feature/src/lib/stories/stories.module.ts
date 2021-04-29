import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoriesComponent } from './stories.component';

@NgModule({
  declarations: [StoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StoriesComponent,
      },
    ]),
  ],
})
export class StoriesModule {}
