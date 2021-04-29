import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoryImageComponent } from './story-image.component';

@NgModule({
  declarations: [StoryImageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: StoryImageComponent },
    ]),
  ],
})
export class StoryImageModule {}
