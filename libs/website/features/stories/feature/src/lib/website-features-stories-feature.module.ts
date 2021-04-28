import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoriesComponent } from './stories/stories.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: StoriesComponent,
        children: [
          {
            path: ':story',
            loadChildren: () =>
              import(
                '@dark-rush-photography/website/features/story/feature'
              ).then((module) => module.WebsiteFeaturesStoryFeatureModule),
          },
        ],
      },
    ]),
  ],
  declarations: [StoriesComponent],
})
export class WebsiteFeaturesStoriesFeatureModule {}
