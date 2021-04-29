import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoriesAdminComponent } from './stories-admin.component';

@NgModule({
  declarations: [StoriesAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: StoriesAdminComponent },
    ]),
  ],
})
export class StoriesAdminModule {}
