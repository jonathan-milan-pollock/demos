import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoriesComponent } from './stories/stories.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: StoriesComponent },
    ]),
  ],
  declarations: [StoriesComponent],
})
export class WebsiteFeaturesStoriesFeatureModule {}
