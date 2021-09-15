import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminImagePostComponent } from './admin-image-post.component';
import { WebsiteUiUiAdminModule } from '@dark-rush-photography/website/ui/ui-admin';
import { EffectsModule } from '@ngrx/effects';
import { ImagePostEffects } from '@dark-rush-photography/website/data';

@NgModule({
  declarations: [AdminImagePostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminImagePostComponent },
    ]),
    EffectsModule.forFeature([ImagePostEffects]),
    ReactiveFormsModule,
    WebsiteUiUiAdminModule,
  ],
})
export class AdminImagePostModule {}
