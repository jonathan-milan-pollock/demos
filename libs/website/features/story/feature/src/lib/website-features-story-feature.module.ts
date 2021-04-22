import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoryComponent } from './story/story.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: StoryComponent },
    ]),
  ],
  declarations: [StoryComponent],
})
export class WebsiteFeaturesStoryFeatureModule {}
