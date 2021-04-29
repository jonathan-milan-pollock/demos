import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoryComponent } from './story.component';

@NgModule({
  declarations: [StoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StoryComponent,
      },
    ]),
  ],
})
export class StoryModule {}
